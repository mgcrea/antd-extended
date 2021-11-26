// @docs https://ant.design/components/time-picker

import {useEffect} from '@storybook/addons';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import 'antd/lib/style/index.less';
import moment, {unitOfTime} from 'moment';
import React, {useState} from 'react';
import 'src/style/reset.css';
import {storybookSizeArgTypes, storybookSizeOptions, StoryContainer} from 'src/utils';
import {TimePicker, TimePickerProps} from './TimePicker';

const startOfOptions: unitOfTime.Base[] = ['minute', 'second'];

export default {
  title: 'ant-design/TimePicker',
  component: TimePicker,
  argTypes: {
    ...storybookSizeArgTypes,
    // value: {
    //   control: {type: 'date'},
    // },
    placeholder: {
      control: {type: 'text'},
    },
    format: {
      control: {type: 'text'},
    },
    utc: {
      control: {type: 'boolean'},
    },
    startOf: {
      options: startOfOptions,
      control: {type: 'select'},
    },
    onChange: {action: 'changed'},
  },
  args: {
    placeholder: 'Start time',
    format: 'HH[h]mm',
    utc: false,
  },
  parameters: {actions: {argTypesRegex: '^on.*'}},
} as ComponentMeta<typeof TimePicker>;

const DefaultTemplate: ComponentStory<typeof TimePicker> = ({
  value: valueProp,
  onChange: onChangeProp,
  ...props
}: TimePickerProps) => {
  const [value, setValue] = useState<TimePickerProps['value']>(valueProp ? moment(valueProp) : undefined);
  const onChange: TimePickerProps['onChange'] = (value, ...otherParams) => {
    setValue(value);
    onChangeProp && onChangeProp(value, ...otherParams);
  };
  useEffect(() => {
    setValue(moment(valueProp));
  }, [valueProp]);
  return (
    <div>
      <div>
        <small>{value?.toISOString()}</small>
      </div>
      <TimePicker value={value} onChange={onChange} {...props}></TimePicker>
    </div>
  );
};
export const Default = DefaultTemplate.bind({});

const SizeTemplate: ComponentStory<typeof TimePicker> = (props, context) => (
  <StoryContainer>
    {storybookSizeOptions.map((size) => {
      return (
        <div key={`${size}`}>
          <div>
            <small>size="{size}"</small>
          </div>
          {DefaultTemplate({...props, size}, context)}
        </div>
      );
    })}
  </StoryContainer>
);
export const Sizes = SizeTemplate.bind({});

const UtcTemplate: ComponentStory<typeof TimePicker> = (props, context) => (
  <StoryContainer>
    {[true, false].map((utc) => {
      return (
        <div key={`${utc}`}>
          <div>
            <small>utc={utc ? 'true' : 'false'}</small>
          </div>
          {DefaultTemplate({...props, utc}, context)}
        </div>
      );
    })}
  </StoryContainer>
);
export const UtcOption = UtcTemplate.bind({});
UtcOption.argTypes = {utc: {control: {type: null}}};

const StartOfTemplate: ComponentStory<typeof TimePicker> = (props, context) => (
  <StoryContainer>
    {startOfOptions.map((startOf) => {
      return (
        <div key={`${startOf}`}>
          <div>
            <small>startOf="{startOf}"</small>
          </div>
          {DefaultTemplate({...props, startOf}, context)}
        </div>
      );
    })}
  </StoryContainer>
);
export const StartOfOption = StartOfTemplate.bind({});
StartOfOption.argTypes = {startOf: {control: {type: null}}};
