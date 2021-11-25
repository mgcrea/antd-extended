// https://ant.design/components/input-number/

import {ComponentMeta, ComponentStory} from '@storybook/react';
import 'antd/lib/style/index.less';
import React, {FunctionComponent, useEffect, useState} from 'react';
import 'src/style/reset.css';
import {storybookSizeArgTypes, storybookSizeOptions, StoryContainer} from 'src/utils';
import {InputNumber, InputNumberProps} from './InputNumber';

export default {
  title: 'ant-design/InputNumber',
  component: InputNumber,
  argTypes: {
    ...storybookSizeArgTypes,
    value: {
      control: {
        type: 'number',
        default: 12,
      },
    },
    min: {
      control: {
        type: 'number',
      },
    },
    max: {
      control: {
        type: 'number',
      },
    },
    onChange: {action: 'changed'},
  },
  args: {
    value: 10,
  },
} as ComponentMeta<typeof InputNumber>;

const DefaultTemplate: FunctionComponent<InputNumberProps> = (props) => <InputNumber {...props} />;
export const Default = DefaultTemplate.bind({});

const SizeTemplate: ComponentStory<typeof InputNumber> = (
  {value: valueProp = '', onChange: onChangeProp, ...otherProps}: InputNumberProps,
  context,
) => {
  const [value, setValue] = useState<InputNumberProps['value']>('');
  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);
  const onChange: InputNumberProps['onChange'] = (value) => {
    setValue(value);
    if (onChangeProp) {
      onChangeProp(value);
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
