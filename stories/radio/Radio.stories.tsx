import {ComponentMeta, ComponentStory} from '@storybook/react';
import 'antd/lib/style/index.less';
import React, {FunctionComponent} from 'react';
import '../style/reset.css';
import {RadioButton, RadioGroup, RadioGroupProps} from './../../src/radio';
import {sizeTemplate, storybookSizeArgTypes} from './../utils';

export default {
  title: 'ant-design/Radio',
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
