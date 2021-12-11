/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  var logDate: (object: any) => void;
}
export const logDate = (object: any) =>
  console.log(
    Object.keys(object).reduce<Record<string, any>>(
      (soFar, key) => ({...soFar, [key]: object[key] ? object[key].toISOString() : object[key]}),
      {},
    ),
  );
globalThis.logDate = logDate;
