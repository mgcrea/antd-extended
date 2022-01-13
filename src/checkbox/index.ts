import {ForwardRefExoticComponent, RefAttributes} from 'react';
import {Checkbox as BaseCheckbox, CheckboxProps} from './Checkbox';

export * from './Checkbox';
export * from './CheckboxButton';
export * from './CheckboxGroup';

import {CheckboxButton} from './CheckboxButton';
import {CheckboxGroup} from './CheckboxGroup';
export const Checkbox = Object.assign(BaseCheckbox, {
  Button: CheckboxButton,
  Group: CheckboxGroup,
}) as ForwardRefExoticComponent<CheckboxProps & RefAttributes<HTMLInputElement>> & {
  Button: typeof CheckboxButton;
  Group: typeof CheckboxGroup;
};
