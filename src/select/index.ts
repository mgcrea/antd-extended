export * from './Select';
export * from './SelectOption';
export * from './SelectOptGroup';

import {Select as BaseSelect} from './Select';
import {SelectOption} from './SelectOption';
import {SelectOptGroup} from './SelectOptGroup';
export const Select = Object.assign(BaseSelect, {
  Option: SelectOption,
  OptGroup: SelectOptGroup,
});
