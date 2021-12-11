import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {CircleOutlined as Icon} from '../../src/icon';
import {storybookSizeArgTypes, titlePrefix} from '../utils';
export {Icon};

export const meta: ComponentMeta<typeof Icon> = {
  title: `${titlePrefix}Icon`,
  component: Icon,
  argTypes: {
    ...storybookSizeArgTypes,
    onChange: {action: 'changed'},
  },
};

export default meta;

const DefaultTemplate: ComponentStory<typeof Icon> = (props) => <Icon {...props} />;
export const CircleOutlined = DefaultTemplate.bind({});
