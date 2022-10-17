// @source https://github.com/ant-design/ant-design/tree/master/components/radio

import {Radio as AntDesignRadio} from 'antd';
import {RadioProps as AntDesignRadioProps} from 'antd/es/radio';
import React, {FunctionComponent} from 'react';

export type RadioProps = AntDesignRadioProps;

export const Radio: FunctionComponent<RadioProps> = ({...otherProps}) => {
  return <AntDesignRadio {...otherProps} />;
};
