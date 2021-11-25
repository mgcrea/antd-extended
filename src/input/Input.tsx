// @docs https://ant.design/components/input/

import {Input as AntDesignInput} from 'antd';
import {InputProps as AntDesignInputProps} from 'antd/lib/input/Input';
import {applySizeProps, classNames, SizeType} from './../utils';
import React, {FunctionComponent} from 'react';
import './style/input.less';

export type InputProps = Omit<AntDesignInputProps, 'size'> & {
  size?: SizeType;
};

export const Input: FunctionComponent<InputProps> = ({size, className, ...otherProps}) => {
  return <AntDesignInput {...applySizeProps('ant-input', {size, className})} {...otherProps} />;
};
