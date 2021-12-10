import dayjs, {Dayjs} from 'dayjs';

export const argValueInjector = (value: number) => (value ? dayjs(value) : value);
export const argValueExtractor = (value?: Dayjs) => (value && value.isValid() ? value.toDate().getTime() : undefined);
export const labelExtractor = (value?: Dayjs) => (value && value.isValid() ? value.toISOString() : typeof value);
