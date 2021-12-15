const uniqueIds = new Map<string, number>();

export const uniqueId = (prefix = '') => {
  const count = (uniqueIds.get(prefix) ?? -1) + 1;
  uniqueIds.set(prefix, count);
  return prefix ? `${prefix}${count}` : `${count}`;
};
