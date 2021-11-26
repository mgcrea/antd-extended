// @docs https://ant.design/components/time-picker

import {ComponentMeta, ComponentStory} from '@storybook/react';
import 'antd/lib/style/index.less';
import moment, {Moment} from 'moment';
import React from 'react';
import 'src/style/reset.css';
import {TimePicker} from './../../src/time-picker';
import {declineTemplate, sizeTemplate, storybookSizeArgTypes, withLocalState} from './../utils';

export default {
  title: 'ant-design/TimePicker',
  component: TimePicker,
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
    placeholder: 'Start time',
    format: 'HH[h]mm',
    utc: false,
  },
  parameters: {actions: {argTypesRegex: '^on.*'}},
} as ComponentMeta<typeof TimePicker>;

const DefaultTemplate: ComponentStory<typeof TimePicker> = withLocalState((props) => <TimePicker {...props} />, {
  argValueInjector: (value: number) => moment(value),
  argValueExtractor: (value: Moment) => value.toDate().getTime(),
  labelExtractor: (value: Moment) => value.toISOString(),
});
export const Default = DefaultTemplate.bind({});

const SizeTemplate = sizeTemplate(DefaultTemplate);
export const Sizes = SizeTemplate.bind({});

const StartOfOptionTemplate = declineTemplate(DefaultTemplate, {name: 'startOf', options: ['minute', 'second']});
export const StartOfOption = StartOfOptionTemplate.bind({});

const UtcOptionTemplate = declineTemplate(DefaultTemplate, {name: 'utc', options: [true, false]});
export const UtcOption = UtcOptionTemplate.bind({});
