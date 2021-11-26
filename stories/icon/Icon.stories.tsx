import {ComponentMeta, ComponentStory} from '@storybook/react';
import 'antd/lib/style/index.less';
import React from 'react';
import '../style/reset.css';
import {CircleOutlined} from './../../src/icon';
import {storybookSizeArgTypes} from './../utils';

export default {
  title: 'ant-design/CircleOutlined',
  component: CircleOutlined,
  argTypes: {
    ...storybookSizeArgTypes,
    onChange: {action: 'changed'},
  },
} as ComponentMeta<typeof CircleOutlined>;

const DefaultTemplate: ComponentStory<typeof CircleOutlined> = (props) => <CircleOutlined {...props} />;
export const Default = DefaultTemplate.bind({});
