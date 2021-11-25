// @docs https://ant.design/components/input/

import SizeContext from 'antd/lib/config-provider/SizeContext';
// import {ConfigConsumer} from 'antd/lib/config-provider';
import AntDesignTextArea, {TextAreaProps as AntDesignTextAreaProps} from 'antd/lib/input/TextArea';
import React, {FunctionComponent, useContext} from 'react';
import {applySizeClassNames, SizeType} from './../utils';
import './style/search-input.less';

export type TextAreaProps = AntDesignTextAreaProps & {
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
