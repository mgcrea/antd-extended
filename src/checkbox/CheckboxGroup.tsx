// @docs https://ant.design/components/checkbox/
// @source https://github.com/ant-design/ant-design/tree/master/components/checkbox

import AntDesignCheckbox, {CheckboxGroupProps as AntDesignCheckboxGroupProps} from 'antd/lib/checkbox';
import SizeContext from 'antd/lib/config-provider/SizeContext';
import React, {FunctionComponent, useContext} from 'react';
import {applySizeClassNames, classNames, SizeType} from './../utils';
import './style/checkbox-group.less';

const AntDesignCheckboxGroup = AntDesignCheckbox.Group;

export type CheckboxGroupProps = Omit<AntDesignCheckboxGroupProps, 'size'> & {
  size?: SizeType;
  layout?: 'horizontal' | 'vertical';
};

export const CheckboxGroup: FunctionComponent<CheckboxGroupProps> = ({
  size,
  className: classNameProp,
  layout,
  ...otherProps
}) => {
  const sizeFromContext = useContext(SizeContext);
  const className = classNames(`ant-checkbox-group-${layout}`, classNameProp);
  return (
    <AntDesignCheckboxGroup
      {...applySizeClassNames('ant-checkbox-group', {
        size: size || sizeFromContext,
        className,
      })}
      {...otherProps}
    />
  );
};
