import {ComponentMeta, ComponentStory} from '@storybook/react';
import {DateRangePicker, DateRangePickerProps} from '../../src/date-picker';
import {
  dateRangeArgValueExtractor,
  dateRangeLabelExtractor,
  declineTemplate,
  sizeTemplate,
  storybookSizeArgTypes,
  titlePrefix,
  withLocalState,
} from '../utils';
export {DateRangePicker};

const startOfOptions: DateRangePickerProps['startOf'][] = ['day', 'hour', 'minute', 'second'];

export const meta: ComponentMeta<typeof DateRangePicker> = {
  title: `${titlePrefix}DateRangePicker`,
  component: DateRangePicker,
  argTypes: {
    ...storybookSizeArgTypes,
    // value: {
    //   control: {type: 'date'},
    // },
    // placeholder: {
    //   control: {type: 'text'},
    // },
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
    // value: [dayjs(), dayjs()],
    placeholder: ['From', 'Until'],
    format: 'YYYY-MM-DD',
    utc: false,
  },
};

export default meta;

const DefaultTemplate: ComponentStory<typeof DateRangePicker> = withLocalState(DateRangePicker, {
  // argValueInjector: (value: number) => [dayjs(value), dayjs(value)],
  argValueExtractor: dateRangeArgValueExtractor,
  labelExtractor: dateRangeLabelExtractor,
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
