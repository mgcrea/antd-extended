/* eslint-disable @typescript-eslint/no-explicit-any */
// @source https://github.com/ant-design/ant-design/blob/master/components/select

import {Select as AntDesignSelect} from 'antd';
import type {SelectProps as AntDesignSelectProps, SelectValue} from 'antd/es/select';
import React, {FunctionComponent} from 'react';
import {applySizeProps, SizeType} from './../utils';
import './style/select.less';

export type SelectProps<VT extends SelectValue = SelectValue> = Omit<AntDesignSelectProps<VT>, 'size'> & {
  size?: SizeType;
};

export const Select = <ValueType extends SelectValue = SelectValue>({
  size,
  className,
  ...otherProps
}: SelectProps<ValueType>): ReturnType<FunctionComponent> => {
  return <AntDesignSelect {...applySizeProps('ant-select', {size, className})} {...otherProps} />;
};
