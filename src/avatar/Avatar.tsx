// @source https://github.com/ant-design/ant-design/tree/master/components/avatar

import {Avatar as AntDesignAvatar} from 'antd';
import {AvatarProps as AntDesignAvatarProps} from 'antd/lib/avatar';
import React, {FunctionComponent} from 'react';
import {applySizeProps, classNames, SizeType} from './../utils';
import './style/avatar.less';

export type AvatarTypes = 'default' | 'primary' | 'secondary';

export type AvatarProps = Omit<AntDesignAvatarProps, 'size'> & {
  size?: SizeType;
  type?: AvatarTypes;
};

export const Avatar: FunctionComponent<AvatarProps> = ({size, className, type, ...otherProps}) => {
  const {className: sizeClassName = className, ...otherSizeProps} = applySizeProps('ant-avatar', {size, className});
  return (
    <AntDesignAvatar
      {...applyAvatarTypeProps('ant-avatar', {type, className: sizeClassName})}
      {...(otherSizeProps as AntDesignAvatarProps)}
      {...otherProps}
    />
  );
};

type AvatarTypeProps = {
  className?: string;
  type?: AvatarTypes;
};

const applyAvatarTypeProps = (prefix: string, {className, type}: AvatarTypeProps): AntDesignAvatarProps => {
  switch (type) {
    case 'primary':
      return {className: classNames(className, `${prefix}-primary`)};
    case 'secondary':
      return {className: classNames(className, `${prefix}-secondary`)};
    default:
      return {className};
  }
};
