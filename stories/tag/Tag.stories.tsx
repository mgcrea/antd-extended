// @docs https://ant.design/components/tag/

import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {titlePrefix} from '../utils';
import {Tag} from './../../src/tag';

export default {
  title: `${titlePrefix}Tag`,
  component: Tag,
  argTypes: {},
} as ComponentMeta<typeof Tag>;

const DefaultTemplate: ComponentStory<typeof Tag> = (props) => (
  <Tag color="magenta" {...props}>
    magenta
  </Tag>
);
export const Default = DefaultTemplate.bind({});

// const SizeTemplate = sizeTemplate(DefaultTemplate);
// export const Sizes = SizeTemplate.bind({});
