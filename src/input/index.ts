export * from './Input';
export * from './Search';
export * from './TextArea';
export * from './Password';

import {Input as BaseInput} from './Input';
import {Password} from './Password';

export const Input = Object.assign(BaseInput, {
  Password,
});
