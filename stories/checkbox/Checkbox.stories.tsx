import {ComponentMeta, ComponentStory} from '@storybook/react';
import 'antd/lib/style/index.less';
import React from 'react';
import 'src/style/reset.css';
import {sizeTemplate, storybookSizeArgTypes} from '../utils';
import {CheckboxButton, CheckboxGroup} from './../../src/checkbox';

export default {
  title: 'ant-design/Checkbox',
  component: CheckboxGroup,
  argTypes: {
    ...storybookSizeArgTypes,
    onChange: {action: 'changed'},
  },
} as ComponentMeta<typeof CheckboxGroup>;

const options = [
  {label: 'Apple', value: 'apple'},
  {label: 'Pear', value: 'pear'},
  {label: 'Orange', value: 'orange'},
];

const DefaultTemplate: ComponentStory<typeof CheckboxGroup> = (props) => <CheckboxGroup options={options} {...props} />;
export const Default = DefaultTemplate.bind({});

const ButtonTemplate: ComponentStory<typeof CheckboxGroup> = (props) => (
  <CheckboxGroup {...props}>
    <CheckboxButton value="apple">Apple</CheckboxButton>
    <CheckboxButton value="pear">Pear</CheckboxButton>
    <CheckboxButton value="orange">Orange</CheckboxButton>
  </CheckboxGroup>
);
export const Buttons = ButtonTemplate.bind({});

const SizeTemplate = sizeTemplate(ButtonTemplate);
export const ButtonsSizes = SizeTemplate.bind({});
