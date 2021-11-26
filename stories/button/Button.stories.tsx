import {ComponentMeta, ComponentStory} from '@storybook/react';
import 'antd/lib/button/style/index.less';
import React, {FunctionComponent} from 'react';
import '../style/reset.css';
import {sizeTemplate, storybookSizeArgTypes} from '../utils';
import {Button, ButtonProps} from './../../src/button';

export default {
  title: 'ant-design/Button',
  component: Button,
  argTypes: {
    ...storybookSizeArgTypes,
    type: {
      options: ['default', 'primary', 'secondary', 'dashed', 'ghost', 'text'],
      control: {
        type: 'inline-radio',
      },
    },
    // children: {
    //   control: {
    //     type: 'text',
    //   },
    // },
    onPress: {action: 'pressed'},
  },
  args: {
    children: 'Hello World',
  },
} as ComponentMeta<typeof Button>;

// const DefaultTemplate = templateWithFixture(Button, fixtureSrc);
const DefaultTemplate: FunctionComponent<ButtonProps> = (props) => <Button {...props} />;
export const Default = DefaultTemplate.bind({});

const TypeTemplate: ComponentStory<typeof Button> = (props) => (
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', maxWidth: 500}}>
    <Button {...props} type="default">
      Default
    </Button>
    <Button {...props} type="primary">
      Primary
    </Button>
    <Button {...props} type="secondary">
      Secondary
    </Button>
    <Button {...props} type="dashed">
      Dashed
    </Button>
  </div>
);
export const ButtonTypes = TypeTemplate.bind({});

const SizeTemplate = sizeTemplate(DefaultTemplate);
export const Sizes = SizeTemplate.bind({});
