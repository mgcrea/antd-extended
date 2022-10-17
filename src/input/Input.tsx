// @docs https://ant.design/components/input/

import {Input as AntDesignInput} from 'antd';
import {InputProps as AntDesignInputProps} from 'antd/es/input/Input';
import React, {FunctionComponent} from 'react';
import {applySizeProps, SizeType} from './../utils';
import './style/input.less';

export type InputProps = Omit<AntDesignInputProps, 'size'> & {
  size?: SizeType;
};

export const Input: FunctionComponent<InputProps> = ({size, className, ...otherProps}) => {
  return <AntDesignInput {...applySizeProps('ant-input', {size, className})} {...otherProps} />;
};
