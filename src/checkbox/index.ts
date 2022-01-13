import {Checkbox as AntDesignCheckbox} from 'antd';
export * from './CheckboxButton';
export * from './CheckboxGroup';

import {CheckboxButton} from './CheckboxButton';
import {CheckboxGroup} from './CheckboxGroup';
export const Checkbox = Object.assign(AntDesignCheckbox, {
  Button: CheckboxButton,
  Group: CheckboxGroup,
}) as typeof AntDesignCheckbox & {Button: typeof CheckboxButton};
