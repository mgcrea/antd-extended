// @source https://github.com/ant-design/ant-design/tree/master/components/radio

import {Button as AntDesignButton} from 'antd';
import {ButtonGroupProps as AntDesignButtonGroupProps} from 'antd/lib/button';
import React, {FunctionComponent} from 'react';

const {Group: AntDesignGroup} = AntDesignButton;

export type ButtonGroupProps = AntDesignButtonGroupProps;

export const ButtonGroup: FunctionComponent<ButtonGroupProps> = ({...otherProps}) => {
  return <AntDesignGroup {...otherProps} />;
};
