import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {Checkbox, CheckboxGroup, CheckboxGroupProps} from '../../src/checkbox';
import {sizeTemplate, storybookSizeArgTypes, titlePrefix} from '../utils';
export {Checkbox};

const layoutOptions: CheckboxGroupProps['layout'][] = ['horizontal', 'vertical'];

export const meta: ComponentMeta<typeof CheckboxGroup> = {
  title: `${titlePrefix}Checkbox`,
  component: Checkbox.Group,
  argTypes: {
    ...storybookSizeArgTypes,
    layout: {
      control: {
        options: layoutOptions,
        type: 'inline-radio',
      },
    },
    onChange: {action: 'changed'},
  },
};

export default meta;

const options = [
  {label: 'Apple', value: 'apple'},
  {label: 'Pear', value: 'pear'},
  {label: 'Orange', value: 'orange'},
];

const DefaultTemplate: ComponentStory<typeof Checkbox.Group> = (props) => (
  <Checkbox.Group options={options} {...props} />
);
export const Default = DefaultTemplate.bind({});

const ButtonTemplate: ComponentStory<typeof Checkbox.Group> = (props) => (
  <Checkbox.Group {...props}>
    <Checkbox.Button value="apple">Apple</Checkbox.Button>
    <Checkbox.Button value="pear">Pear</Checkbox.Button>
    <Checkbox.Button value="orange">Orange</Checkbox.Button>
  </Checkbox.Group>
);
export const Buttons = ButtonTemplate.bind({});

const SizeTemplate = sizeTemplate(ButtonTemplate);
export const Sizes = SizeTemplate.bind({});
