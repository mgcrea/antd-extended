import generatePicker, {
  PickerDateProps,
  PickerProps,
  PickerTimeProps as BasePickerTimeProps,
  RangePickerProps as BaseRangePickerProps,
  RangePickerTimeProps as BaseRangePickerTimeProps,
} from 'antd/lib/date-picker/generatePicker';
import dayjs, {Dayjs} from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs';
import './config/dayjs';
export type {EventValue} from 'rc-picker/lib/interface';

// @NOTE workaround https://github.com/react-component/picker/issues/66
const localeMap: Record<string, string> = {
  en_GB: 'en-gb',
  en_US: 'en',
  zh_CN: 'zh-cn',
  zh_TW: 'zh-tw',
};
const parseLocale = (locale: string) => {
  const mapLocale = localeMap[locale];
  return mapLocale || locale.split('_')[0];
};
dayjsGenerateConfig.locale.parse = (locale, text, formats) => {
  const localeStr = parseLocale(locale);
  for (let i = 0; i < formats.length; i += 1) {
    const format = formats[i];
    const formatText = text;
    if (format.includes('wo') || format.includes('Wo')) {
      // parse Wo
      const year = formatText.split('-')[0];
      const weekStr = formatText.split('-')[1];
      const firstWeek = dayjs(year, 'YYYY').startOf('year').locale(localeStr);
      for (let j = 0; j <= 52; j += 1) {
        const nextWeek = firstWeek.add(j, 'week');
        if (nextWeek.format('Wo') === weekStr) {
          return nextWeek;
        }
      }
      // parseNoMatchNotice();
      return null;
    }
    const date = dayjs(formatText, format, true).locale(localeStr);
    if (date.isValid()) {
      return date;
    }
  }
  // parseNoMatchNotice();
  return null;
};

export const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export type DatePickerProps = PickerProps<Dayjs>;
export type MonthPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'>;
export type WeekPickerProps = Omit<PickerDateProps<Dayjs>, 'picker'>;
export type RangePickerProps = BaseRangePickerProps<Dayjs>;
export type PickerTimeProps = Omit<BasePickerTimeProps<Dayjs>, 'picker'>;
export type RangePickerTimeProps = Omit<BaseRangePickerTimeProps<Dayjs>, 'picker'>;
