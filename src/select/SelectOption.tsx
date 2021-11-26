// @source https://github.com/ant-design/ant-design/blob/master/components/select

import {Select as AntDesignSelect} from 'antd';
import type {OptionProps as AntDesignSelectOptionProps} from 'antd/lib/select';
import React, {FunctionComponent} from 'react';

export const {Option: AntDesignSelectOption} = AntDesignSelect;

export type SelectOptionProps = AntDesignSelectOptionProps;

export const SelectOption: FunctionComponent<SelectOptionProps> = (otherProps) => {
  return <AntDesignSelectOption {...otherProps} />;
};

// @NOTE duck-typing for rc-select
Object.assign(SelectOption, {isSelectOption: true});
