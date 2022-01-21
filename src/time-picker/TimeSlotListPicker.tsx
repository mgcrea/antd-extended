import {CloseCircleFilled, PlusCircleFilled} from '@ant-design/icons';
import {Tooltip} from 'antd';
import dayjs from 'dayjs';
import React, {FunctionComponent, HTMLProps, useCallback, useMemo, useRef, useState} from 'react';
import {classNames, uniqueId} from '../utils';
import './style/time-slot-list-picker.less';
import {TimeSlotPicker, TimeSlotPickerProps, TimeSlotPickerValue} from './TimeSlotPicker';

// @TODO refactor away from "extraRows" clunky state

export type TimeSlotListPickerValue = TimeSlotPickerValue[];

export type TimeSlotListPickerProps = Pick<HTMLProps<HTMLDivElement>, 'className' | 'style' | 'id'> &
  Omit<TimeSlotPickerProps, 'onSelect' | 'onChange' | 'value'> & {
    onChange?: (value: TimeSlotListPickerValue) => void;
    maxSpread?: number;
    value?: TimeSlotListPickerValue;
  };

export const TimeSlotListPicker: FunctionComponent<TimeSlotListPickerProps> = ({
  className,
  style,
  value: valueProp = [],
  maxSpread = 36e5 * 24,
  onChange,
  ...otherProps
}) => {
  const [values, setValues] = useState<TimeSlotListPickerValue>(valueProp);
  const [extraRows, setExtraRows] = useState<string[]>(values.slice(1).map(() => uniqueId('row_')));

  const handleChangeForIndex = useCallback(
    (value: TimeSlotPickerValue, index: number) => {
      setValues((values) => {
        values[index] = value;
        // const hasValidValues = !values.some((value) => !Array.isArray(value) || value.some(isUndefined));
        // if (onChange && hasValidValues) {
        //   onChange(values);
        // }
        if (onChange) {
          onChange(values);
        }
        return [...values];
      });
    },
    [onChange],
  );

  // @NOTE required to prevent infinite onChange loop when handler ref is broken
  const {current: cachedOnSelectHandlers} = useRef<Map<number, TimeSlotPickerProps['onChange']>>(new Map());
  const getOnChangeHandlerForIndex = useCallback(
    (index: number) => {
      if (!cachedOnSelectHandlers.has(index)) {
        cachedOnSelectHandlers.set(index, (value) => handleChangeForIndex(value, index));
      }
      return cachedOnSelectHandlers.get(index);
    },
    [handleChangeForIndex, cachedOnSelectHandlers],
  );
  // @TODO handle spread (24h max), reduce min?
  const getIsAfterForIndex = (index: number) => {
    // jlog({values: values.slice(0, index + 1)});
    const isAfter = values.slice(0, index + 1).reduce((soFar, [_from, to]) => {
      if (to && to.isAfter(soFar)) {
        soFar = to;
      }
      return soFar;
    }, dayjs(0));
    // console.log(`${index}.isAfter`, isAfter?.toISOString());
    return isAfter;
  };
  const getIsBeforeForIndex = (_index: number) => {
    const isBefore = values[0] && values[0][0] ? dayjs(values[0][0]).add(maxSpread) : undefined;
    // console.log(`${index}.isBefore`, isBefore?.toISOString());
    return isBefore;
  };

  const getOnDeleteClickForIndex = useCallback(
    (index: number) => (): void => {
      setValues((values) => {
        values.splice(index, 1);
        if (onChange) {
          onChange(values);
        }
        return [...values];
      });
      setExtraRows((extraRows) => {
        extraRows.splice(index - 1, 1);
        return [...extraRows];
      });
    },
    [onChange],
  );

  const handleAddRow = useCallback(() => {
    setExtraRows((extraRows) => {
      extraRows.push(uniqueId('row_'));
      return [...extraRows];
    });
  }, []);

  const canAddSlot = useMemo(() => {
    if (!values.length) {
      return true;
    }
    const endsAtMidnight = values.some(([_, to]) => {
      return to && to.get('hour') === 23 && to.get('minute') >= 58;
    });
    const endsNextDay = values.some(([from, to]) => {
      return from && to && to.isBefore(from);
    });
    if (endsAtMidnight || endsNextDay) {
      return false;
    }
    return true;
  }, [values]);

  return (
    <div style={style} className={classNames('ant-slot-list-picker', className)}>
      <div className="ant-row">
        <span className="ant-slot-list-picker-index">#1</span>
        <TimeSlotPicker onChange={getOnChangeHandlerForIndex(0)} value={values[0]} {...otherProps} />
        {canAddSlot && extraRows.length === 0 ? (
          <Tooltip title="Ajouter plage">
            <PlusCircleFilled onClick={handleAddRow} className="ant-slot-list-picker-add-slot" />
          </Tooltip>
        ) : null}
      </div>
      {extraRows.map((value, index) => (
        <div className="ant-row" key={value}>
          <span className="ant-slot-list-picker-index">#{index + 2}</span>
          <TimeSlotPicker
            onChange={getOnChangeHandlerForIndex(index + 1)}
            value={values[index + 1]}
            isBefore={getIsBeforeForIndex(index + 1)}
            isAfter={getIsAfterForIndex(index + 1)}
            {...otherProps}
          />
          <Tooltip title="Supprimer plage">
            <CloseCircleFilled
              onClick={getOnDeleteClickForIndex(index + 1)}
              className="ant-slot-list-picker-delete-slot"
            />
          </Tooltip>
          {/* <code>
            <hr />
            {JSON.stringify({
              isBefore: getIsBeforeForIndex(index + 1),
              isAfter: getIsAfterForIndex(index + 1)
            })}
          </code> */}
          {canAddSlot && index === extraRows.length - 1 ? (
            <Tooltip title="Ajouter plage">
              <PlusCircleFilled onClick={handleAddRow} className="ant-slot-list-picker-add-slot" />
            </Tooltip>
          ) : null}
        </div>
      ))}
    </div>
  );
};
