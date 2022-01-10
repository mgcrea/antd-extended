// @source https://github.com/ant-design/ant-design/tree/master/components/avatar

import {Avatar as AntDesignAvatar} from 'antd';
import {AvatarProps as AntDesignAvatarProps} from 'antd/lib/avatar';
import {AvatarSize} from 'antd/lib/avatar/SizeContext';
import React, {FunctionComponent} from 'react';
import {applySizeProps, SizeType} from './../utils';
import './style/avatar.less';

export type AvatarProps = Omit<AntDesignAvatarProps, 'size'> & {
  size?: SizeType;
};

export const Avatar: FunctionComponent<AvatarProps> = ({size, className, ...otherProps}) => {
  return <AntDesignAvatar {...(applySizeProps('ant-avatar', {size, className}) as AvatarSize)} {...otherProps} />;
};
