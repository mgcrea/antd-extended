// @docs https://ant.design/components/avatar/

import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {declineTemplate, sizeTemplate, storybookSizeArgTypes, titlePrefix} from '../utils';
import {Avatar, AvatarProps} from '../../src/avatar';

const buttonTypeOptions: AvatarProps['type'][] = ['default', 'primary', 'secondary'];

export default {
  title: `${titlePrefix}Avatar`,
  component: Avatar,
  argTypes: {
    ...storybookSizeArgTypes,
    type: {
      options: buttonTypeOptions,
      control: {
        type: 'inline-radio',
      },
    },
  },
} as ComponentMeta<typeof Avatar>;

const DefaultTemplate: ComponentStory<typeof Avatar> = (props) => <Avatar {...props}>OL</Avatar>;
export const Default = DefaultTemplate.bind({});

const TypeTemplate: ComponentStory<typeof Avatar> = declineTemplate(DefaultTemplate, {
  name: 'type',
  options: buttonTypeOptions,
  layout: 'horizontal',
});
export const Types = TypeTemplate.bind({});

const SizeTemplate = sizeTemplate(DefaultTemplate);
export const Sizes = SizeTemplate.bind({});
