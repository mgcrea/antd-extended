// @docs https://ant.design/components/time-picker

import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {TimePicker} from './../../src/time-picker';
import {
  argValueExtractor,
  argValueInjector,
  declineTemplate,
  labelExtractor,
  sizeTemplate,
  storybookSizeArgTypes,
  titlePrefix,
  withLocalState,
} from './../utils';

export default {
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
    placeholder: 'Start time',
    format: 'HH[h]mm',
    utc: false,
  },
  parameters: {actions: {argTypesRegex: '^on.*'}},
} as ComponentMeta<typeof TimePicker>;

const DefaultTemplate: ComponentStory<typeof TimePicker> = withLocalState((props) => <TimePicker {...props} />, {
  argValueInjector,
  argValueExtractor,
  labelExtractor,
});
export const Default = DefaultTemplate.bind({});

const SizeTemplate = sizeTemplate(DefaultTemplate);
export const Sizes = SizeTemplate.bind({});

const StartOfOptionTemplate = declineTemplate(DefaultTemplate, {name: 'startOf', options: ['minute', 'second']});
export const StartOfOption = StartOfOptionTemplate.bind({});

const UtcOptionTemplate = declineTemplate(DefaultTemplate, {name: 'utc', options: [true, false]});
export const UtcOption = UtcOptionTemplate.bind({});
