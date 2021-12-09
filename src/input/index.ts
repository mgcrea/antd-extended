export * from './Input';
export * from './Search';
export * from './TextArea';
export * from './Password';

import {Input as BaseInput} from './Input';
import {Password} from './Password';
import {Search} from './Search';
import {TextArea} from './TextArea';

export const Input = Object.assign(BaseInput, {
  Password,
  Search,
  TextArea,
});
