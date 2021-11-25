export * from './Button';
export * from './ButtonGroup';

import {Button as BaseButton} from './Button';
import {ButtonGroup} from './ButtonGroup';
export const Button = Object.assign(BaseButton, {
  Group: ButtonGroup,
});
