export const integerArraySuite = (from: number, to: number): number[] => {
  if (from > to) {
    return [];
  }
  return Array.from(Array(to - from + 1).keys()).map((value) => value + from);
};

export const isUndefined = (maybeUndefined: unknown) => typeof maybeUndefined === 'undefined';
