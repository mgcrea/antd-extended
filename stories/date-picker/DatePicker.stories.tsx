import {ComponentMeta, ComponentStory} from '@storybook/react';
import 'antd/lib/style/index.less';
import moment, {Moment} from 'moment';
import React from 'react';
import '../style/reset.css';
import {DatePicker} from './../../src/date-picker';
import {declineTemplate, sizeTemplate, storybookSizeArgTypes, withLocalState} from './../utils';

export default {
  title: 'ant-design/DatePicker',
  component: DatePicker,
  argTypes: {
    ...storybookSizeArgTypes,
    value: {
      control: {type: 'date'},
    },
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
      options: ['minute', 'second'],
      control: {type: 'select'},
    },
    onChange: {action: 'changed'},
  },
  args: {
    placeholder: 'Date',
    format: 'YYYY-mm-DD',
    utc: false,
  },
} as ComponentMeta<typeof DatePicker>;

const DefaultTemplate: ComponentStory<typeof DatePicker> = withLocalState((props) => <DatePicker {...props} />, {
  argValueInjector: (value: number) => moment(value),
  argValueExtractor: (value: Moment) => value.toDate().getTime(),
  labelExtractor: (value: Moment) => value.toISOString(),
});
export const Default = DefaultTemplate.bind({});

const SizeTemplate = sizeTemplate(DefaultTemplate);
export const Sizes = SizeTemplate.bind({});

const StartOfOptionTemplate = declineTemplate(DefaultTemplate, {
  name: 'startOf',
  options: ['day', 'hour', 'minute', 'second'],
});
export const StartOfOption = StartOfOptionTemplate.bind({});

const UtcOptionTemplate = declineTemplate(DefaultTemplate, {name: 'utc', options: [true, false]});
export const UtcOption = UtcOptionTemplate.bind({});
