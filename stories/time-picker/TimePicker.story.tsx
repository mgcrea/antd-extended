// @docs https://ant.design/components/time-picker

import {ComponentMeta, ComponentStory} from '@storybook/react';
import dayjs from 'dayjs';
import React from 'react';
import {TimePicker} from '../../src/time-picker';
// import {TimePicker} from 'antd';
import {
  dateArgValueExtractor,
  dateArgValueInjector,
  declineTemplate,
  dateLabelExtractor,
  sizeTemplate,
  storybookSizeArgTypes,
  titlePrefix,
  withLocalState,
} from '../utils';
export {TimePicker};

export const meta: ComponentMeta<typeof TimePicker> = {
  title: `${titlePrefix}TimePicker`,
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
  },
  args: {
    placeholder: 'Time',
    format: 'HH:mm',
    utc: false,
  },
};

const DefaultTemplate: ComponentStory<typeof TimePicker> = withLocalState((props) => <TimePicker {...props} />, {
  argValueInjector: dateArgValueInjector,
  argValueExtractor: dateArgValueExtractor,
  labelExtractor: dateLabelExtractor,
  trigger: 'onChange',
});
export const Default = DefaultTemplate.bind({});

const SizeTemplate = sizeTemplate(DefaultTemplate);
export const Sizes = SizeTemplate.bind({});

const StartOfOptionTemplate = declineTemplate(DefaultTemplate, {name: 'startOf', options: ['minute', 'second']});
export const StartOfOption = StartOfOptionTemplate.bind({});

const UtcOptionTemplate = declineTemplate(DefaultTemplate, {name: 'utc', options: [true, false]});
export const UtcOption = UtcOptionTemplate.bind({});

const IsBeforeOptionTemplate = declineTemplate(DefaultTemplate, {
  name: 'isBefore',
  options: [dayjs('1970-01-01T02:02:00.000Z').utc()],
  // extraProps: {utc: true},
});
export const IsBeforeOption = IsBeforeOptionTemplate.bind({});

const IsAfterOptionTemplate = declineTemplate(DefaultTemplate, {
  name: 'isAfter',
  options: [dayjs('1970-01-01T02:02:00.000Z').utc()],
  // extraProps: {utc: true},
});
export const IsAfterOption = IsAfterOptionTemplate.bind({isAfter: '1970-01-01T02:02:00.000Z'});
