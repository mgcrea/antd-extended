// @docs https://ant.design/components/input/

import {InputNumber as AntDesignInputNumber} from 'antd';
import {InputNumberProps as AntDesignInputNumberProps} from 'antd/lib/input-number';
import {applySizeProps, SizeType} from './../utils';
import React, {FunctionComponent} from 'react';
import './style/input-number.less';

export type InputNumberProps = Omit<AntDesignInputNumberProps, 'size'> & {
  size?: SizeType;
};

export const InputNumber: FunctionComponent<InputNumberProps> = ({size, className, children, ...otherProps}) => {
  return (
    <>
      <AntDesignInputNumber {...applySizeProps('ant-input-number', {size, className})} {...otherProps} />
      {children}
    </>
  );
};
