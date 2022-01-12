import {Checkbox as BaseCheckbox} from 'antd';
export * from './CheckboxButton';
export * from './CheckboxGroup';

import {CheckboxButton} from './CheckboxButton';
import {CheckboxGroup} from './CheckboxGroup';
export const Checkbox = Object.assign(BaseCheckbox, {
  Button: CheckboxButton,
  Group: CheckboxGroup,
});
