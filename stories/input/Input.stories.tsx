import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {Input} from './../../src/input';
import {sizeTemplate, storybookSizeArgTypes, titlePrefix, withLocalState} from './../utils';

export default {
  title: `${titlePrefix}Input`,
  component: Input,
  argTypes: {
    ...storybookSizeArgTypes,
    value: {
      control: {
        type: 'text',
        default: 'Hello World',
      },
    },
    onChange: {action: 'changed'},
  },
  args: {
    value: 'Hello World',
  },
} as ComponentMeta<typeof Input>;

const DefaultTemplate: ComponentStory<typeof Input> = withLocalState((props) => <Input {...props} />, {
  valueExtractor: (event) => {
    return event.target.value;
  },
});
export const Default = DefaultTemplate.bind({});

const SizeTemplate = sizeTemplate(DefaultTemplate);
export const Sizes = SizeTemplate.bind({});
