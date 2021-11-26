// @docs https://ant.design/components/time-picker
// @source https://github.com/ant-design/ant-design/tree/master/components/time-picker

import {CloseCircleFilled} from '@ant-design/icons';
import {TimePicker as AntDesignTimePicker} from 'antd';
import {TimePickerProps as AntDesignTimePickerProps} from 'antd/lib/time-picker';
import moment, {Moment, MomentFormatSpecification, unitOfTime} from 'moment';
import React, {FunctionComponent, useCallback, useMemo} from 'react';
import {applySizeProps, SizeType} from './../utils';
import './style/time-picker.less';

export type TimePickerProps = Omit<AntDesignTimePickerProps, 'size' | 'format'> & {
  size?: SizeType;
  startOf?: unitOfTime.Base;
  // isBefore?: MomentInput;
  // isAfter?: MomentInput;
  format?: MomentFormatSpecification;
  isBefore?: Moment | null;
  isAfter?: Moment | null;
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
  const handleReset = useCallback(() => {
    if (onSelect) {
      onSelect(null as unknown as Moment);
    }
  }, [onSelect]);
  const clearIcon = useMemo<NonNullable<AntDesignTimePickerProps['clearIcon']>>(
    () => <CloseCircleFilled onClick={handleReset} role="button" />,
    [handleReset],
  );
  const isBeforeOverflows = utc && isBefore && isBefore.date() > 1;
  const isAfterOverflows = utc && isAfter && isAfter.date() > 1;

  const applyMomentOptions = useCallback(
    (value: Moment | null): Moment | null => {
      if (!value) {
        return value;
      }
      if (utc) {
        // @NOTE Keep existing date for utc-like values to allow overflowing
        const nextDate = value.year() === 1970 && value.month() === 0 ? value.date() : 1;
        value.year(1970).month(0).date(nextDate).utc(true);
      }
      if (startOf) {
        value.startOf(startOf);
      }
      return value;
    },
    [startOf, utc],
  );

  const isBeforeWithOptions = useMemo<Moment | null>(
    () => (isBefore ? applyMomentOptions(moment(isBefore).clone()) : null),
    [applyMomentOptions, isBefore],
  );
  const isAfterWithOptions = useMemo<Moment | null>(
    () => (isAfter ? applyMomentOptions(moment(isAfter).clone()) : null),
    [applyMomentOptions, isAfter],
  );

  const performOnSelect = useCallback<NonNullable<AntDesignTimePickerProps['onSelect']>>(
    (value) => {
      if (!onSelect) {
        return;
      }
      if (isBeforeWithOptions) {
        if (value.isSameOrAfter(isBeforeWithOptions)) {
          onSelect(isBeforeWithOptions.clone().subtract(1, startOf));
          return;
        }
      }
      if (isAfterWithOptions && !isBeforeOverflows) {
        if (value.isSameOrBefore(isAfterWithOptions)) {
          onSelect(isAfterWithOptions.clone().add(1, startOf));
          return;
        }
      }
      onSelect(isAfterOverflows ? value.clone().add(1, 'day') : value);
    },
    [isBeforeWithOptions, isBeforeOverflows, isAfterWithOptions, isAfterOverflows, startOf, onSelect],
  );

  const handleSelect = useCallback<NonNullable<AntDesignTimePickerProps['onSelect']>>(
    (value) => {
      applyMomentOptions(value);
      performOnSelect(value);
    },
    [applyMomentOptions, performOnSelect],
  );

  const handleBlur = useCallback<NonNullable<AntDesignTimePickerProps['onBlur']>>(
    (ev) => {
      if (onBlur) {
        onBlur(ev);
      }
      const {currentTarget: inputEl} = ev;
      const value = moment(inputEl.value.toLowerCase(), format);
      if (!value.isValid()) {
        return;
      }
      applyMomentOptions(value);
      // Trigger onSelect on blur
      if (!valueProp || value.toISOString() !== valueProp.toISOString()) {
        performOnSelect(value);
      }
    },
    [applyMomentOptions, onBlur, performOnSelect, format, valueProp],
  );

  const handleChange = useCallback<NonNullable<AntDesignTimePickerProps['onChange']>>(
    (value, timeString) => {
      applyMomentOptions(value);
      if (onChange) {
        onChange(value, timeString);
      }
      // Trigger onSelect when pressing enter
      if (!value || !value.isValid()) {
        return;
      }
      if (!valueProp || value.toISOString() !== valueProp.toISOString()) {
        performOnSelect(value);
      }
    },
    [applyMomentOptions, valueProp, onChange, performOnSelect],
  );

  const lazyDisabledHours = useMemo<ReturnType<NonNullable<AntDesignTimePickerProps['disabledHours']>>>(() => {
    const values = disabledHours ? disabledHours() : [];
    // @NOTE non-utc support?
    const isDisabledInside = isBeforeOverflows && !isAfterOverflows;
    if (isDisabledInside) {
      const [beforeHour, beforeMinutes] = [isBefore.hour(), isBefore.minutes()];
      const [afterHour, afterMinutes] = [isAfter ? isAfter.hour() : 24, isAfter ? isAfter.minutes() : 0];
      values.push(
        ...integerArraySuite(
          beforeMinutes > 0 ? beforeHour + 1 : beforeHour,
          afterMinutes >= 59 ? afterHour : afterHour - 1,
        ),
      );
      return values;
    }
    if (isAfter) {
      const [hour, minutes] = [isAfter.hour(), isAfter.minutes()];
      values.push(...integerArraySuite(0, minutes >= 59 ? hour : hour - 1));
    }
    if (isBefore) {
      const [hour, minutes] = [isBefore.hour(), isBefore.minutes()];
      values.push(...integerArraySuite(minutes > 0 ? hour + 1 : hour, 23));
    }
    return values;
  }, [isBefore, isBeforeOverflows, isAfter, isAfterOverflows, disabledHours]);
  const getDisabledHours = useCallback<NonNullable<AntDesignTimePickerProps['disabledHours']>>(
    () => lazyDisabledHours,
    [lazyDisabledHours],
  );
  const getDisabledMinutes = useCallback<NonNullable<AntDesignTimePickerProps['disabledMinutes']>>(
    (selectedHour) => {
      const values = disabledMinutes ? disabledMinutes(selectedHour) : [];
      if (isAfter) {
        const [hour, minutes] = [isAfter.hour(), isAfter.minutes()];
        if (selectedHour === hour) {
          values.push(...integerArraySuite(0, minutes));
        }
      }
      if (isBefore) {
        const [hour, minutes] = [isBefore.hour(), isBefore.minutes()];
        if (selectedHour === hour) {
          values.push(...integerArraySuite(minutes, 59));
        }
      }
      return values;
    },
    [isBefore, isAfter, disabledMinutes],
  );

  return (
    <AntDesignTimePicker
      clearIcon={clearIcon}
      onSelect={handleSelect}
      onChange={handleChange}
      onBlur={handleBlur}
      disabledHours={getDisabledHours}
      disabledMinutes={getDisabledMinutes}
      value={valueProp}
      // @ts-expect-error bad <AntDesignTimePicker /> typing
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
