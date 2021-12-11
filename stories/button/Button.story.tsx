import {ComponentMeta, ComponentStory} from '@storybook/react';
import React, {FunctionComponent} from 'react';
import {Button, ButtonProps} from '../../src/button';
import {declineTemplate, sizeTemplate, storybookSizeArgTypes, titlePrefix} from '../utils';
export {Button};

const buttonTypeOptions: ButtonProps['type'][] = ['default', 'primary', 'secondary', 'dashed', 'ghost', 'text'];

export const meta: ComponentMeta<typeof Button> = {
  title: `${titlePrefix}Button`,
  component: Button,
  argTypes: {
    ...storybookSizeArgTypes,
    type: {
      options: buttonTypeOptions,
      control: {
        type: 'inline-radio',
      },
    },
    onClick: {action: 'clicked'},
  },
  args: {
    children: 'Hello World',
  },
};

export default meta;

const DefaultTemplate: FunctionComponent<ButtonProps> = (props) => <Button {...props} />;
export const Default = DefaultTemplate.bind({});

const TypeTemplate: ComponentStory<typeof Button> = declineTemplate(DefaultTemplate, {
  name: 'type',
  options: buttonTypeOptions,
  layout: 'horizontal',
});
export const Types = TypeTemplate.bind({});

const SizeTemplate = sizeTemplate(DefaultTemplate, {
  layout: 'horizontal',
});
export const Sizes = SizeTemplate.bind({});
