import {ComponentMeta, ComponentStory} from '@storybook/react';
import 'antd/lib/style/index.less';
import React, {FunctionComponent, useEffect, useState} from 'react';
import 'src/style/reset.css';
import {storybookSizeArgTypes, storybookSizeOptions, StoryContainer} from 'src/utils';
import {Input, InputProps} from './Input';
// import {templateWithFixture} from './../../stories/utils/fixtures';
// import fixtureSrc from './Button.fixture.png';

export default {
  title: 'ant-design/Input',
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

const DefaultTemplate: FunctionComponent<InputProps> = (props) => <Input {...props} />;
export const Default = DefaultTemplate.bind({});

const SizeTemplate: ComponentStory<typeof Input> = (
  {value: valueProp = '', onChange: onChangeProp, ...otherProps}: InputProps,
  context,
) => {
  const [value, setValue] = useState<InputProps['value']>('');
  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);
  const onChange: InputProps['onChange'] = (event) => {
    setValue(event.target.value);
    if (onChangeProp) {
      onChangeProp(event);
    }
  };
  return (
    <StoryContainer>
      {storybookSizeOptions.map((size) => {
        return (
          <>
            <span>{size}</span>
            {DefaultTemplate({...otherProps, value, onChange, size}, context)}
          </>
        );
      })}
    </StoryContainer>
  );
};
export const Sizes = SizeTemplate.bind({});
