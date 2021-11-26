// @docs https://ant.design/components/tag/

import {ComponentMeta, ComponentStory} from '@storybook/react';
import 'antd/lib/style/index.less';
import React from 'react';
import '../style/reset.css';
import {Tag} from './../../src/tag';

export default {
  title: 'ant-design/Tag',
  component: Tag,
  argTypes: {},
} as ComponentMeta<typeof Tag>;

const DefaultTemplate: ComponentStory<typeof Tag> = (props) => (
  <Tag color="magenta" {...props}>
    magenta
  </Tag>
);
export const Default = DefaultTemplate.bind({});

// const SizeTemplate = sizeTemplate(DefaultTemplate);
// export const Sizes = SizeTemplate.bind({});
