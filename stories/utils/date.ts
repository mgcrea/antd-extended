import dayjs, {Dayjs} from 'dayjs';

export const dateArgValueInjector = (value: number) => (value ? dayjs(value) : value);
export const dateArgValueExtractor = (value?: Dayjs) =>
  value && value.isValid() ? value.toDate().getTime() : undefined;
export const dateLabelExtractor = (value?: Dayjs) => (value && value.isValid() ? value.toISOString() : `${value}`);

export const dateRangeArgValueExtractor = (value?: [Dayjs, Dayjs]) => {
  if (!value) {
    return value;
  }
  const [from, until] = value;
  return [dateArgValueExtractor(from), dateArgValueExtractor(until)];
};

export const dateRangeLabelExtractor = (value?: [Dayjs, Dayjs]) => {
  if (!value) {
    return typeof value;
  }
  const [from, until] = value;
  return `${dateLabelExtractor(from)} -> ${dateLabelExtractor(until)}`;
};
