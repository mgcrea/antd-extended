// @docs https://ant.design/components/input/

import {Input} from 'antd';
import {PasswordProps as AntDesignPasswordProps} from 'antd/es/input';
import React, {FunctionComponent} from 'react';
import {applySizeClassNames, SizeType} from './../utils';
import './style/input.less';

const AntDesignPassword = Input.Password;

export type PasswordProps = Omit<AntDesignPasswordProps, 'size'> & {
  size?: SizeType;
};
export const Password: FunctionComponent<PasswordProps> = ({size, className, ...otherProps}) => {
  return <AntDesignPassword {...applySizeClassNames('ant-input', {size, className})} {...otherProps} />;
};
