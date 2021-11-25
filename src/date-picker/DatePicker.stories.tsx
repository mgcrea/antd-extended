import {ComponentMeta, ComponentStory} from '@storybook/react';
import 'antd/lib/style/index.less';
import React, {FunctionComponent} from 'react';
import 'src/style/reset.css';
import {storybookSizeArgTypes, storybookSizeOptions} from 'src/utils';
import {DatePicker, DatePickerProps} from './DatePicker';

export default {
  title: 'ant-design/DatePicker',
  component: DatePicker,
  argTypes: {
    ...storybookSizeArgTypes,
    onChange: {action: 'changed'},
  },
} as ComponentMeta<typeof DatePicker>;

const DatePickerTemplate: FunctionComponent<DatePickerProps> = (props) => <DatePicker {...props} />;

export const Default = DatePickerTemplate.bind({});

const SizeTemplate: ComponentStory<typeof DatePicker> = (props, context) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexDirection: 'column',
      flex: '1 1 auto',
      height: '100%',
    }}
  >
    {storybookSizeOptions.map((size) => {
      return (
        <>
          <span>{size}</span>
          {DatePickerTemplate({...props, size}, context)}
        </>
      );
    })}
  </div>
);
export const Sizes = SizeTemplate.bind({});
