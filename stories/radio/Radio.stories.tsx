import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FunctionComponent} from 'react';
import {RadioButton, RadioGroup, RadioGroupProps} from './../../src/radio';
import {sizeTemplate, storybookSizeArgTypes, titlePrefix} from './../utils';

export default {
  title: `${titlePrefix}Radio`,
  component: RadioGroup,
  argTypes: {
    ...storybookSizeArgTypes,
    onChange: {action: 'changed'},
  },
} as ComponentMeta<typeof RadioGroup>;

const options = [
  {label: 'Apple', value: 'apple'},
  {label: 'Pear', value: 'pear'},
  {label: 'Orange', value: 'orange'},
];

const DefaultTemplate: FunctionComponent<RadioGroupProps> = (props) => <RadioGroup options={options} {...props} />;
export const Default = DefaultTemplate.bind({});

const ButtonTemplate: ComponentStory<typeof RadioGroup> = (props) => (
  <RadioGroup {...props}>
    <RadioButton value="apple">Apple</RadioButton>
    <RadioButton value="pear">Pear</RadioButton>
    <RadioButton value="orange">Orange</RadioButton>
  </RadioGroup>
);
export const Buttons = ButtonTemplate.bind({});

const SizeTemplate = sizeTemplate(DefaultTemplate);
export const Sizes = SizeTemplate.bind({});
