import {ComponentMeta, ComponentStory} from '@storybook/react';
import {DatePicker, DatePickerProps} from '../../src/date-picker';
import {
  dateArgValueExtractor,
  dateArgValueInjector,
  dateLabelExtractor,
  declineTemplate,
  sizeTemplate,
  storybookSizeArgTypes,
  titlePrefix,
  withLocalState,
} from '../utils';
export {DatePicker};

const startOfOptions: DatePickerProps['startOf'][] = ['day', 'hour', 'minute', 'second'];

export const meta: ComponentMeta<typeof DatePicker> = {
  title: `${titlePrefix}DatePicker`,
  component: DatePicker,
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
      options: startOfOptions,
      control: {type: 'select'},
    },
    onChange: {action: 'changed'},
  },
  args: {
    // value: dayjs(),
    placeholder: 'Date',
    format: 'YYYY-MM-DD',
    utc: false,
  },
};

export default meta;

const DefaultTemplate: ComponentStory<typeof DatePicker> = withLocalState(DatePicker, {
  argValueInjector: dateArgValueInjector,
  argValueExtractor: dateArgValueExtractor,
  labelExtractor: dateLabelExtractor,
});
export const Default = DefaultTemplate.bind({});

const SizeTemplate = sizeTemplate(DefaultTemplate);
export const Sizes = SizeTemplate.bind({});

const StartOfOptionTemplate = declineTemplate(DefaultTemplate, {
  name: 'startOf',
  options: ['day', 'hour', 'minute', 'second'],
});
export const StartOfOption = StartOfOptionTemplate.bind({});

const UtcOptionTemplate = declineTemplate(DefaultTemplate, {name: 'utc', options: [true, false], layout: 'horizontal'});
export const UtcOption = UtcOptionTemplate.bind({});
