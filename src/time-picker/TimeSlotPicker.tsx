import {ArrowRightOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';
import React, {FunctionComponent, HTMLProps, ReactNode, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {TimePicker, TimePickerProps} from './TimePicker';

export type TimeSlotPickerValue = [TimePickerProps['value'], TimePickerProps['value']];

export type TimeSlotPickerProps = Pick<HTMLProps<HTMLDivElement>, 'className' | 'style'> &
  Omit<TimePickerProps, 'onSelect' | 'onChange' | 'placeholder' | 'value'> & {
    inputStyle?: TimePickerProps['style'];
    onChange?: (value: TimeSlotPickerValue) => void;
    onSelect?: (value: TimeSlotPickerValue, stringValue: [string, string]) => void;
    placeholder?: [string, string];
    value?: TimeSlotPickerValue;
    allowOverflow?: boolean;
    maxSpread?: number;
    overflowLabel?: ReactNode;
  };

export const TimeSlotPicker: FunctionComponent<TimeSlotPickerProps> = ({
  style,
  inputStyle,
  value: valueProp,
  className,
  placeholder,
  onChange,
  onSelect,
  startOf = 'second',
  allowOverflow,
  overflowLabel = 'J+1',
  isBefore,
  isAfter,
  ...otherProps
}) => {
  const isDirty = useRef<boolean>(false);
  const [fromValue, setFromValue] = useState<TimePickerProps['value']>(valueProp ? valueProp[0] : undefined);
  const [toValue, setToValue] = useState<TimePickerProps['value']>(valueProp ? valueProp[1] : undefined);
  const values = useMemo<TimeSlotPickerValue>(() => [fromValue, toValue], [fromValue, toValue]);

  useEffect(() => {
    if (!isDirty.current) {
      return;
    }
    // logDate(values);
    const hasInvalidValues = values.some((value) => !(value && value.isValid()));
    if (onChange && !hasInvalidValues) {
      onChange(values);
    }
  }, [onChange, values]);

  const doesOverflow = useMemo<boolean>(() => {
    if (!fromValue || !toValue) {
      return false;
    }
    return toValue.toDate().getTime() <= fromValue.toDate().getTime() || toValue.date() !== fromValue.date();
  }, [fromValue, toValue]);

  const handleFromChange = useCallback((fromValue) => {
    isDirty.current = true;
    // logDate({fromValue});
    setFromValue(fromValue);
  }, []);

  const handleToChange = useCallback(
    (toValue) => {
      isDirty.current = true;
      console.warn({toValue});
      const willOverflow = fromValue && toValue && toValue.toDate().getTime() <= fromValue.toDate().getTime();
      // @NOTE ux vs disabled?
      if (!allowOverflow && willOverflow) {
        setToValue(fromValue.clone().add(1, startOf));
      } else {
        // @NOTE probably not required anymore
        // setToValue(allowOverflow && willOverflow ? toValue.clone().add(1, 'day') : toValue);
        setToValue(toValue);
      }
    },
    [allowOverflow, startOf, fromValue],
  );

  const toIsAfter = useMemo(() => {
    if (fromValue && !allowOverflow) {
      return isAfter ? dayjs.max(isAfter, fromValue) : fromValue;
    }
    return isAfter;
  }, [allowOverflow, fromValue, isAfter]);

  return (
    <div style={style} className={className}>
      <TimePicker
        placeholder={placeholder ? placeholder[0] : undefined}
        style={inputStyle}
        onChange={handleFromChange}
        value={fromValue}
        startOf={startOf}
        isBefore={isBefore}
        isAfter={isAfter}
        {...otherProps}
      />
      <span style={{margin: '0 1em'}}>
        <ArrowRightOutlined />
      </span>
      <TimePicker
        placeholder={placeholder ? placeholder[1] : undefined}
        style={inputStyle}
        onChange={handleToChange}
        value={toValue}
        isBefore={isBefore}
        isAfter={toIsAfter}
        startOf={startOf}
        {...otherProps}
      />
      {doesOverflow ? <span style={{margin: '0 0 0 .5em'}}>{overflowLabel}</span> : null}
    </div>
  );
};
