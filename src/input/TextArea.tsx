// @docs https://ant.design/components/input/

import SizeContext from 'antd/es/config-provider/SizeContext';
// import {ConfigConsumer} from 'antd/es/config-provider';
import AntDesignTextArea, {TextAreaProps as AntDesignTextAreaProps} from 'antd/es/input/TextArea';
import React, {FunctionComponent, useContext} from 'react';
import {applySizeClassNames, SizeType} from './../utils';
import './style/input.less';

export type TextAreaProps = Omit<AntDesignTextAreaProps, 'size'> & {
  size?: SizeType;
};

export const TextArea: FunctionComponent<TextAreaProps> = ({size, className, ...otherProps}) => {
  const sizeFromContext = useContext(SizeContext);
  return (
    <AntDesignTextArea
      {...applySizeClassNames('ant-input', {size: size || sizeFromContext, className})}
      {...otherProps}
    />
  );
};
