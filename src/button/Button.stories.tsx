import {ComponentMeta, ComponentStory} from '@storybook/react';
import 'antd/lib/button/style/index.less';
import React, {FunctionComponent} from 'react';
import 'src/style/reset.css';
import {storybookSizeArgTypes, storybookSizeOptions, StoryContainer} from 'src/utils';
import {Button, ButtonProps} from './Button';

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

const SizeTemplate: ComponentStory<typeof Button> = ({children, ...props}: ButtonProps, context) => (
  <StoryContainer>
    {storybookSizeOptions.map((size) => {
      return (
        <>
          <span>{size}</span>
          {DefaultTemplate({...props, size, children: children || size}, context)}
        </>
      );
    })}
  </StoryContainer>
);
export const Sizes = SizeTemplate.bind({});
