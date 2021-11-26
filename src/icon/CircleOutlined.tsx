import React, {FunctionComponent, HTMLProps} from 'react';
import {classNames} from './../utils';

export type CircleOutlinedProps = HTMLProps<HTMLSpanElement>;

export const CircleOutlined: FunctionComponent<CircleOutlinedProps> = ({className, ...otherProps}) => {
  return (
    <span role="img" aria-label="circle" className={classNames('anticon anticon-circle', className)} {...otherProps}>
      <svg width="1em" height="1em" fill="currentColor" data-icon="check-circle" viewBox="64 64 896 896">
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
      </svg>
    </span>
  );
};
