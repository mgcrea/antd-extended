// @docs https://ant.design/components/select

import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {Select, SelectOption} from './../../src/select';
import {sizeTemplate, storybookSizeArgTypes, titlePrefix} from './../utils';

const options = [
  {label: 'Jack', value: 'jack'},
  {label: 'Lucy', value: 'lucy'},
  {label: 'Disabled', value: 'disabled', disabled: true},
];

const values = options.map(({value}) => value);

export default {
  title: `${titlePrefix}Select`,
  component: Select,
  argTypes: {
    ...storybookSizeArgTypes,
    defaultValue: {
      options: values,
      control: {type: 'select'},
    },
    // value: {
    //   options: values,
    //   control: {type: 'select'},
    // },
    onChange: {action: 'changed'},
  },
  args: {
    defaultValue: 'lucy',
  },
} as ComponentMeta<typeof Select>;

const DefaultTemplate: ComponentStory<typeof Select> = (props) => <Select options={options} {...props}></Select>;
export const Default = DefaultTemplate.bind({});

const InlineTemplate: ComponentStory<typeof Select> = (props) => (
  <Select {...props}>
    {options.map(({label, value, ...otherProps}) => (
      <SelectOption key={value} value={value} {...otherProps}>
        {label}
      </SelectOption>
    ))}
  </Select>
);
export const Inline = InlineTemplate.bind({});

const SizeTemplate = sizeTemplate(DefaultTemplate);
export const Sizes = SizeTemplate.bind({});
