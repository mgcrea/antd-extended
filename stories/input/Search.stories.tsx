import {ComponentMeta, ComponentStory} from '@storybook/react';
import 'antd/lib/style/index.less';
import React from 'react';
import 'src/style/reset.css';
import {Search} from './../../src/input';
import {sizeTemplate, storybookSizeArgTypes, withLocalState} from './../utils';

const meta: ComponentMeta<typeof Search> = {
  title: 'ant-design/Input/Search',
  component: Search,
  argTypes: {
    ...storybookSizeArgTypes,
    value: {
      control: {
        type: 'text',
      },
    },
    debounce: {
      control: {
        type: 'range',
        min: 0,
        max: 10000,
        step: 500,
      },
    },
    onChange: {action: 'changed'},
    onSearch: {action: 'search'},
  },
  args: {
    value: 'Hello World',
    debounce: 400,
  },
};
export default meta;

const DefaultTemplate: ComponentStory<typeof Search> = withLocalState((props) => <Search {...props} />, {
  valueExtractor: (event) => {
    return event.target.value;
  },
});
export const Default = DefaultTemplate.bind({});

const SizeTemplate = sizeTemplate(DefaultTemplate);
export const Sizes = SizeTemplate.bind({});
