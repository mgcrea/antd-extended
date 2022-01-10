// @docs https://ant.design/components/avatar/

import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {sizeTemplate, titlePrefix} from '../utils';
import {Avatar} from './../../src/avatar';

export default {
  title: `${titlePrefix}Avatar`,
  component: Avatar,
  argTypes: {},
} as ComponentMeta<typeof Avatar>;

const DefaultTemplate: ComponentStory<typeof Avatar> = (props) => <Avatar {...props}>OL</Avatar>;
export const Default = DefaultTemplate.bind({});

const SizeTemplate = sizeTemplate(DefaultTemplate);
export const Sizes = SizeTemplate.bind({});
