// @source https://github.com/ant-design/ant-design/tree/master/components/radio

import {Radio as AntDesignRadio} from 'antd';
import {CheckCircleOutlined} from '@ant-design/icons';
import {CircleOutlined} from '../icon';
import {RadioButtonProps as AntDesignRadioButtonProps} from 'antd/lib/radio/radioButton';
import {SizeType} from './../utils';
import React, {cloneElement, FunctionComponent, ReactElement, ReactNode} from 'react';
import './style/radio-button.less';

const AntDesignRadioButton = AntDesignRadio.Button;

export type RadioButtonProps = Omit<AntDesignRadioButtonProps, 'size'> & {
  size?: SizeType;
  checkedIcon?: ReactElement;
  withIcon?: boolean;
};

export const RadioButton: FunctionComponent<RadioButtonProps> = ({
  children,
  checked,
  checkedIcon = <CheckCircleOutlined />,
  withIcon = true,
  ...otherProps
}) => {
  return (
    <AntDesignRadioButton checked={checked} {...otherProps}>
      {withIcon ? (
        <span className="ant-radio-button-icons">
          <CircleOutlined className="ant-radio-button-icon" />
          {cloneElement(checkedIcon, {className: 'ant-radio-button-icon-checked'})}
        </span>
      ) : null}
      {children}
    </AntDesignRadioButton>
  );
};
