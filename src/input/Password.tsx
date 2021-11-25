// @docs https://ant.design/components/input/

import {Input} from 'antd';
import {PasswordProps as AntDesignPasswordProps} from 'antd/lib/input';
import React, {FunctionComponent} from 'react';
import {applySizeClassNames} from './../utils';

const AntDesignPassword = Input.Password;

export type PasswordProps = AntDesignPasswordProps;

export const Password: FunctionComponent<PasswordProps> = ({size, className, ...otherProps}) => {
  return <AntDesignPassword {...applySizeClassNames('ant-input', {size, className})} {...otherProps} />;
};
