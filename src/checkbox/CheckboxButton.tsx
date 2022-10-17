// @docs https://ant.design/components/checkbox/
// @source https://github.com/ant-design/ant-design/tree/master/components/checkbox

import React, {FunctionComponent} from 'react';
import {classNames} from './../utils';
import AntDesignCheckbox, {CheckboxProps} from 'antd/es/checkbox';
import './style/checkbox-button.less';

export type CheckboxButtonProps = CheckboxProps;

export const CheckboxButton: FunctionComponent<CheckboxButtonProps> = ({className, ...otherProps}) => {
  return <AntDesignCheckbox className={classNames(className, 'ant-checkbox-button-wrapper')} {...otherProps} />;
};
