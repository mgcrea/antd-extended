// @docs https://ant.design/components/select

import {ComponentMeta, ComponentStory} from '@storybook/react';
import 'antd/lib/style/index.less';
import React from 'react';
import 'src/style/reset.css';
import {storybookSizeArgTypes, storybookSizeOptions, StoryContainer} from 'src/utils';
import {Select} from './Select';
import {SelectOption} from './SelectOption';
// import {useArgs} from '@storybook/api';

const options = [
  {label: 'Jack', value: 'jack'},
  {label: 'Lucy', value: 'lucy'},
  {label: 'Disabled', value: 'disabled', disabled: true},
];

const values = options.map(({value}) => value);

export default {
  title: 'ant-design/Select',
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

const DefaultTemplate: ComponentStory<typeof Select> = (props) => {
  // const [args, updateArgs, resetArgs] = useArgs();
  return <Select options={options} {...props}></Select>;
};
export const Default = DefaultTemplate.bind({});

const InlineTemplate: ComponentStory<typeof Select> = (props) => (
  <Select defaultValue="lucy" {...props}>
    {options.map(({label, value, ...otherProps}) => {
      return (
        <SelectOption key={value} value={value} {...otherProps}>
          {label}
        </SelectOption>
      );
    })}
  </Select>
);
export const Inline = InlineTemplate.bind({});

const SizeTemplate: ComponentStory<typeof Select> = (props, context) => (
  <StoryContainer>
    {storybookSizeOptions.map((size) => {
      return (
        <>
          <span>{size}</span>
          {DefaultTemplate({...props, size}, context)}
        </>
      );
    })}
  </StoryContainer>
);
export const Sizes = SizeTemplate.bind({});
