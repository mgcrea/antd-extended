import {ComponentMeta, ComponentStory} from '@storybook/react';
import 'antd/lib/style/index.less';
import React from 'react';
import 'src/style/reset.css';
import {TextArea} from './../../src/input';
import {sizeTemplate, storybookSizeArgTypes, withLocalState} from './../utils';

const meta: ComponentMeta<typeof TextArea> = {
  title: 'ant-design/Input/TextArea',
  component: TextArea,
  argTypes: {
    ...storybookSizeArgTypes,
    value: {
      control: {
        type: 'text',
      },
    },
    onChange: {action: 'changed'},
  },
  args: {
    value: 'Hello World',
  },
};
export default meta;

const DefaultTemplate: ComponentStory<typeof TextArea> = withLocalState((props) => <TextArea {...props} />, {
  valueExtractor: (event) => {
    return event.target.value;
  },
});
export const Default = DefaultTemplate.bind({});

const SizeTemplate = sizeTemplate(DefaultTemplate);
export const Sizes = SizeTemplate.bind({});
