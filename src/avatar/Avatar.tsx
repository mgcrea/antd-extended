// @source https://github.com/ant-design/ant-design/tree/master/components/avatar

import {Avatar as AntDesignAvatar} from 'antd';
import {AvatarProps as AntDesignAvatarProps} from 'antd/es/avatar';
import {AvatarSize} from 'antd/es/avatar/SizeContext';
import React, {FunctionComponent} from 'react';
import {applySizeClassNames, classNames, SizeType} from './../utils';
import './style/avatar.less';

export type AvatarTypes = 'default' | 'primary' | 'secondary';

export type AvatarProps = Omit<AntDesignAvatarProps, 'size'> & {
  size?: SizeType | number;
  type?: AvatarTypes;
};

export const Avatar: FunctionComponent<AvatarProps> = ({size, className, type, ...otherProps}) => {
  const {className: sizeClassName = className, ...otherSizeProps} = applyAvatarSizeProps('ant-avatar', {
    size,
    className,
  });
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

const applyAvatarSizeProps = (prefix: string, {className, size}: AvatarProps): AntDesignAvatarProps => {
  switch (size) {
    // @Note do not duplicate existing ant-design classes
    case 'small':
    case 'large':
      return {className, size};
    case 'x-small':
    case 'x-large':
    case 'xx-large':
    case 'medium':
      return applySizeClassNames(prefix, {className, size});
    default:
      return {className, size: size as AvatarSize};
  }
};
