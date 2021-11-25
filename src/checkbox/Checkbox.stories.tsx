import {ComponentMeta, ComponentStory} from '@storybook/react';
import 'antd/lib/style/index.less';
import React, {FunctionComponent} from 'react';
import 'src/style/reset.css';
import {storybookSizeArgTypes, storybookSizeOptions, StoryContainer} from 'src/utils';
import {CheckboxButton} from './CheckboxButton';
import {CheckboxGroup, CheckboxGroupProps} from './CheckboxGroup';

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

const DefaultTemplate: FunctionComponent<CheckboxGroupProps> = (props) => (
  <CheckboxGroup options={options} {...props} />
);
export const Default = DefaultTemplate.bind({});

const ButtonTemplate: ComponentStory<typeof CheckboxGroup> = (props) => (
  <CheckboxGroup {...props}>
    <CheckboxButton value="apple">Apple</CheckboxButton>
    <CheckboxButton value="pear">Pear</CheckboxButton>
    <CheckboxButton value="orange">Orange</CheckboxButton>
  </CheckboxGroup>
);
export const Buttons = ButtonTemplate.bind({});

const SizeTemplate: ComponentStory<typeof CheckboxGroup> = (props, context) => (
  <StoryContainer>
    {storybookSizeOptions.map((size) => {
      return (
        <>
          <span>{size}</span>
          {ButtonTemplate({...props, size}, context)}
        </>
      );
    })}
  </StoryContainer>
);
export const Sizes = SizeTemplate.bind({});
