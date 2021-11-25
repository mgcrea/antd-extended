// @docs https://ant.design/components/checkbox/
// @source https://github.com/ant-design/ant-design/tree/master/components/checkbox

import {Checkbox as AntDesignCheckbox} from 'antd';
import {CheckboxProps as AntDesignCheckboxProps} from 'antd/lib/checkbox';
import React, {FunctionComponent} from 'react';

export type CheckboxProps = AntDesignCheckboxProps;

export const Checkbox: FunctionComponent<CheckboxProps> = ({...otherProps}) => {
  return <AntDesignCheckbox {...otherProps} />;
};
