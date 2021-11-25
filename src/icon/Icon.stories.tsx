import {ComponentMeta} from '@storybook/react';
import 'antd/lib/style/index.less';
import React, {FunctionComponent} from 'react';
import 'src/style/reset.css';
import {storybookSizeArgTypes} from 'src/utils';
import {CircleOutlined, CircleOutlinedProps} from './CircleOutlined';

export default {
  title: 'ant-design/CircleOutlined',
  component: CircleOutlined,
  argTypes: {
    ...storybookSizeArgTypes,
    onChange: {action: 'changed'},
  },
} as ComponentMeta<typeof CircleOutlined>;

const DefaultTemplate: FunctionComponent<CircleOutlinedProps> = (props) => <CircleOutlined {...props} />;

export const Default = DefaultTemplate.bind({});
