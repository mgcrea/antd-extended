export * from './Radio';
export * from './RadioButton';
export * from './RadioGroup';

import {Radio as BaseRadio} from './Radio';
import {RadioButton} from './RadioButton';
import {RadioGroup} from './RadioGroup';
export const Radio = Object.assign(BaseRadio, {
  Button: RadioButton,
  Group: RadioGroup,
});
