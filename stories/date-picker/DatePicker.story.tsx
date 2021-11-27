import {ComponentMeta, ComponentStory} from '@storybook/react';
import moment, {Moment} from 'moment';
import {DatePicker, DatePickerProps} from '../../src/date-picker';
import {declineTemplate, sizeTemplate, storybookSizeArgTypes, titlePrefix, withLocalState} from '../utils';
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
    value: moment(),
    placeholder: 'Date',
    format: 'YYYY-MM-DD',
    utc: false,
  },
};

// export default meta;

const DefaultTemplate: ComponentStory<typeof DatePicker> = withLocalState(DatePicker, {
  argValueInjector: (value: number) => moment(value),
  argValueExtractor: (value: Moment) => value.toDate().getTime(),
  labelExtractor: (value: Moment) => value.toISOString(),
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
// const UtcOptionTemplate = (props) => createElement(DatePicker, props);
// const UtcOptionTemplate = withLocalState(DatePicker, {
//   argValueInjector: (value: number) => moment(value),
//   argValueExtractor: (value: Moment) => value.toDate().getTime(),
//   // labelExtractor: (value: Moment) => value.toISOString(),
// });
export const UtcOption = UtcOptionTemplate.bind({});
