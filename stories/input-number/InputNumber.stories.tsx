// https://ant.design/components/input-number/

import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import {InputNumber} from './../../src/input-number';
import {sizeTemplate, storybookSizeArgTypes, titlePrefix, withLocalState} from './../utils';

export default {
  title: `${titlePrefix}InputNumber`,
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

const DefaultTemplate: ComponentStory<typeof InputNumber> = withLocalState((props) => <InputNumber {...props} />, {
  valueExtractor: (event) => {
    return event;
  },
});
export const Default = DefaultTemplate.bind({});

const SizeTemplate = sizeTemplate(DefaultTemplate);
export const Sizes = SizeTemplate.bind({});
