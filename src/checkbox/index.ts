export * from './Checkbox';
export * from './CheckboxButton';
export * from './CheckboxGroup';

import {Checkbox as BaseCheckbox} from './Checkbox';
import {CheckboxButton} from './CheckboxButton';
import {CheckboxGroup} from './CheckboxGroup';
export const Checkbox = Object.assign(BaseCheckbox, {
  Button: CheckboxButton,
  Group: CheckboxGroup,
});
