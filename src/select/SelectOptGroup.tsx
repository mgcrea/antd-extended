// @source https://github.com/ant-design/ant-design/blob/master/components/select

import {Select as AntDesignSelect} from 'antd';
import type {OptGroupProps as AntDesignSelectOptGroupProps} from 'rc-select/es/OptGroup';
import React, {FunctionComponent} from 'react';

export const {OptGroup: AntDesignSelectOptGroup} = AntDesignSelect;

export type SelectOptGroupProps = AntDesignSelectOptGroupProps;

export const SelectOptGroup: FunctionComponent<SelectOptGroupProps> = (otherProps) => {
  return <AntDesignSelectOptGroup {...otherProps} />;
};

// @NOTE duck-typing for rc-select
Object.assign(SelectOptGroup, {isSelectOptGroup: true});
