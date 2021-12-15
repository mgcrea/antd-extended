// @cli npx jest src/antd/components/time-picker/TimePicker.test.tsx --watch --coverage --collectCoverageOnlyFrom=src/antd/components/time-picker/TimePicker.tsx

import dayjs from 'dayjs';
import React from 'react';
import {setupTests, getOptionItemByLabel, selectOptionItemByLabel, toggleOpen, mount} from 'test/utils';
import {TimePicker} from 'src/time-picker/TimePicker';

const DISABLED_OPTION_CLASS = 'ant-picker-time-panel-cell-disabled';

setupTests();

describe('<TimePicker />', () => {
  it('select onClick', async () => {
    const onSelect = jest.fn();
    mount(<TimePicker onSelect={onSelect} utc />);
    toggleOpen();
    selectOptionItemByLabel('03', 0);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(expect.any(dayjs));
    expect(onSelect.mock.calls[onSelect.mock.calls.length - 1][0].toISOString()).toEqual('1970-01-01T03:00:00.000Z');
  });
  it('isAfter option', async () => {
    mount(<TimePicker isAfter={dayjs.utc('1970-01-01T03:30:00.000Z')} utc />);
    toggleOpen();
    expect(getOptionItemByLabel('02', 0)).toHaveClass(DISABLED_OPTION_CLASS);
    expect(getOptionItemByLabel('03', 0)).not.toHaveClass(DISABLED_OPTION_CLASS);
    selectOptionItemByLabel('03', 0);
    expect(getOptionItemByLabel('30', 1)).toHaveClass(DISABLED_OPTION_CLASS);
    expect(getOptionItemByLabel('31', 1)).not.toHaveClass(DISABLED_OPTION_CLASS);
  });
  it('isBefore option', async () => {
    mount(<TimePicker isBefore={dayjs.utc('1970-01-01T03:30:00.000Z')} utc />);
    toggleOpen();
    expect(getOptionItemByLabel('03', 0)).not.toHaveClass(DISABLED_OPTION_CLASS);
    expect(getOptionItemByLabel('04', 0)).toHaveClass(DISABLED_OPTION_CLASS);
    selectOptionItemByLabel('03', 0);
    expect(getOptionItemByLabel('29', 1)).not.toHaveClass(DISABLED_OPTION_CLASS);
    expect(getOptionItemByLabel('30', 1)).toHaveClass(DISABLED_OPTION_CLASS);
  });
});
