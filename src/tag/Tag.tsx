// @source https://github.com/ant-design/ant-design/tree/master/components/radio

import {Tag as AntDesignTag} from 'antd';
import {TagProps as AntDesignTagProps} from 'antd/es/tag';
import React, {FunctionComponent} from 'react';
import './style/tag.less';

export type TagProps = AntDesignTagProps;

export const Tag: FunctionComponent<TagProps> = ({...otherProps}) => {
  return <AntDesignTag {...otherProps} />;
};
