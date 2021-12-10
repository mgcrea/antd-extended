// @docs https://ant.design/components/time-picker
// @source https://github.com/ant-design/ant-design/tree/master/components/time-picker

import {CloseCircleFilled} from '@ant-design/icons';
import {OpUnitType} from 'dayjs';
import React, {FunctionComponent, useCallback, useMemo, useRef} from 'react';
import {DatePicker, PickerTimeProps} from './../date-picker/Picker';
import {applySizeProps, SizeType} from './../utils';

const {TimePicker: InternalTimePicker} = DatePicker;

type Defined<T> = T extends undefined ? never : T;
export type TimePickerValue = Defined<PickerTimeProps['value']>;

export type TimePickerProps = Omit<PickerTimeProps, 'picker' | 'size' | 'onSelect'> & {
  size?: SizeType;
  startOf?: OpUnitType;
  onSelect?: (value: TimePickerValue) => void;
  isBefore?: TimePickerValue;
  isAfter?: TimePickerValue;
  utc?: boolean;
};

export const TimePicker: FunctionComponent<TimePickerProps> = ({
  size,
  className,
  onSelect,
  onChange,
  onBlur,
  value: valueProp,
  disabledHours,
  disabledMinutes,
  format = 'HH:mm:ss',
  startOf = 'second',
  isBefore,
  isAfter,
  utc,
  ...otherProps
}) => {
  const lastSelectedValue = useRef<TimePickerValue>(valueProp || null);
  const handleReset = useCallback(() => {
    if (onSelect) {
      onSelect(null);
    }
  }, [onSelect]);
  const clearIcon = useMemo<NonNullable<PickerTimeProps['clearIcon']>>(
    () => <CloseCircleFilled onClick={handleReset} role="button" />,
    [handleReset],
  );
  const isBeforeOverflows = utc && isBefore && isBefore.date() > 1;
  const isAfterOverflows = utc && isAfter && isAfter.date() > 1;

  const applyDateOptions = useCallback(
    (nextValue: TimePickerValue): TimePickerValue => {
      if (!nextValue) {
        return nextValue;
      }
      let value = nextValue;
      if (utc) {
        // @NOTE Keep existing date for utc-like values to allow overflowing
        const nextDate = value.year() === 1970 && value.month() === 0 ? value.date() : 1;
        value = value.year(1970).month(0).date(nextDate).utc(true);
      }
      if (startOf) {
        value = value.startOf(startOf);
      }
      return value;
    },
    [startOf, utc],
  );

  // const isBeforeWithOptions = useMemo<TimePickerValue>(
  //   () => (isBefore ? applyDateOptions(dayjs(isBefore).clone()) : null),
  //   [applyDateOptions, isBefore],
  // );
  // const isAfterWithOptions = useMemo<TimePickerValue>(
  //   () => (isAfter ? applyDateOptions(dayjs(isAfter).clone()) : null),
  //   [applyDateOptions, isAfter],
  // );

  // const performOnSelect = useCallback<NonNullable<TimePickerProps['onSelect']>>(
  //   (value) => {
  //     if (!onSelect) {
  //       return;
  //     }
  //     if (isBeforeWithOptions) {
  //       if (value && value.isSameOrAfter(isBeforeWithOptions)) {
  //         onSelect(isBeforeWithOptions.clone().subtract(1, startOf));
  //         return;
  //       }
  //     }
  //     if (isAfterWithOptions && !isBeforeOverflows) {
  //       if (value && value.isSameOrBefore(isAfterWithOptions)) {
  //         onSelect(isAfterWithOptions.clone().add(1, startOf));
  //         return;
  //       }
  //     }
  //     const nextValue = value && isAfterOverflows ? value.clone().add(1, 'day') : value;
  //     onSelect(nextValue);
  //   },
  //   [isBeforeWithOptions, isBeforeOverflows, isAfterWithOptions, isAfterOverflows, startOf, onSelect],
  // );

  const handleSelect = useCallback<NonNullable<TimePickerProps['onSelect']>>(
    (value) => {
      lastSelectedValue.current = value;
      if (onSelect) {
        onSelect(value);
      }
      // const value = applyDateOptions(nextValue);
      // performOnSelect(value);
    },
    [onSelect],
  );

  const handleBlur = useCallback<NonNullable<TimePickerProps['onBlur']>>(
    (ev) => {
      const {current: value} = lastSelectedValue;
      if (!value) {
        return;
      }
      if (onChange) {
        onChange(value, value.format(`${format}`));
      }
      if (onBlur) {
        onBlur(ev);
      }
    },
    [onBlur, format, onChange],
  );

  const handleChange = useCallback<NonNullable<TimePickerProps['onChange']>>(
    (value, timeString) => {
      const nextValue = applyDateOptions(value);
      if (onChange) {
        onChange(nextValue, timeString);
      }
      // // Trigger onSelect when pressing enter
      // if (!value || !value.isValid()) {
      //   return;
      // }
      // if (!valueProp || value.toISOString() !== valueProp.toISOString()) {
      //   performOnSelect(value);
      // }
    },
    [applyDateOptions, onChange],
  );

  const lazyDisabledHours = useMemo<ReturnType<NonNullable<TimePickerProps['disabledHours']>>>(() => {
    const values = disabledHours ? disabledHours() : [];
    // @NOTE non-utc support?
    const isDisabledInside = isBeforeOverflows && !isAfterOverflows;
    if (isDisabledInside) {
      const [beforeHour, beforeMinutes] = [isBefore.hour(), isBefore.minute()];
      const [afterHour, afterMinutes] = [isAfter ? isAfter.hour() : 24, isAfter ? isAfter.minute() : 0];
      values.push(
        ...integerArraySuite(
          beforeMinutes > 0 ? beforeHour + 1 : beforeHour,
          afterMinutes >= 59 ? afterHour : afterHour - 1,
        ),
      );
      return values;
    }
    if (isAfter) {
      const [hour, minutes] = [isAfter.hour(), isAfter.minute()];
      values.push(...integerArraySuite(0, minutes >= 59 ? hour : hour - 1));
    }
    if (isBefore) {
      const [hour, minutes] = [isBefore.hour(), isBefore.minute()];
      values.push(...integerArraySuite(minutes > 0 ? hour + 1 : hour, 23));
    }
    return values;
  }, [isBefore, isBeforeOverflows, isAfter, isAfterOverflows, disabledHours]);
  const getDisabledHours = useCallback<NonNullable<PickerTimeProps['disabledHours']>>(
    () => lazyDisabledHours,
    [lazyDisabledHours],
  );
  const getDisabledMinutes = useCallback<NonNullable<PickerTimeProps['disabledMinutes']>>(
    (selectedHour) => {
      const values = disabledMinutes ? disabledMinutes(selectedHour) : [];
      if (isAfter) {
        const [hour, minutes] = [isAfter.hour(), isAfter.minute()];
        if (selectedHour === hour) {
          values.push(...integerArraySuite(0, minutes));
        }
      }
      if (isBefore) {
        const [hour, minutes] = [isBefore.hour(), isBefore.minute()];
        if (selectedHour === hour) {
          values.push(...integerArraySuite(minutes, 59));
        }
      }
      return values;
    },
    [isBefore, isAfter, disabledMinutes],
  );

  return (
    <InternalTimePicker
      clearIcon={clearIcon}
      onSelect={handleSelect}
      onChange={handleChange}
      onBlur={handleBlur}
      disabledHours={getDisabledHours}
      disabledMinutes={getDisabledMinutes}
      value={valueProp}
      format={format}
      {...applySizeProps('ant-picker', {size, className})}
      {...otherProps}
    />
  );
};

const integerArraySuite = (from: number, to: number): number[] => {
  if (from > to) {
    return [];
  }
  return Array.from(Array(to - from + 1).keys()).map((value) => value + from);
};
