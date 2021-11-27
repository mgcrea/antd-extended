import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {Password} from './../../src/input';
import {sizeTemplate, storybookSizeArgTypes, titlePrefix, withLocalState} from './../utils';

const meta: ComponentMeta<typeof Password> = {
  title: `${titlePrefix}Input/Password`,
  component: Password,
  argTypes: {
    ...storybookSizeArgTypes,
    value: {
      control: {
        type: 'text',
      },
    },
    onChange: {action: 'changed'},
  },
  args: {
    value: 'Hello World',
  },
};
export default meta;

const DefaultTemplate: ComponentStory<typeof Password> = withLocalState((props) => <Password {...props} />, {
  valueExtractor: (event) => {
    return event.target.value;
  },
});
export const Default = DefaultTemplate.bind({});

const SizeTemplate = sizeTemplate(DefaultTemplate);
export const Sizes = SizeTemplate.bind({});
