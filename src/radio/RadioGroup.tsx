// @source https://github.com/ant-design/ant-design/tree/master/components/radio

import {Radio as AntDesignRadio} from 'antd';
import {RadioGroupProps as AntDesignRadioGroupProps} from 'antd/lib/radio';
import {applySizeProps, SizeType} from './../utils';
import React, {FunctionComponent} from 'react';

const AntDesignRadioGroup = AntDesignRadio.Group;

export type RadioGroupProps = Omit<AntDesignRadioGroupProps, 'size'> & {
  size?: SizeType;
};

export const RadioGroup: FunctionComponent<RadioGroupProps> = ({size, className, ...otherProps}) => {
  return <AntDesignRadioGroup {...applySizeProps('ant-radio-group', {size, className})} {...otherProps} />;
};
