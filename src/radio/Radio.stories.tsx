import {ComponentMeta, ComponentStory} from '@storybook/react';
import 'antd/lib/style/index.less';
import React, {FunctionComponent} from 'react';
import 'src/style/reset.css';
import {storybookSizeArgTypes, storybookSizeOptions, StoryContainer} from 'src/utils';
import {RadioButton} from './RadioButton';
import {RadioGroup, RadioGroupProps} from './RadioGroup';

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

const SizeTemplate: ComponentStory<typeof RadioGroup> = (props, context) => (
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
