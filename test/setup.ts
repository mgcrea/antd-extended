/* eslint-disable no-var */
import {log, warn} from 'console';
import {inspect} from 'util';
import {prettyDOM} from '@testing-library/react';

declare global {
  var log: (...args: unknown[]) => void;
  var jlog: (...args: unknown[]) => void;
  var dlog: (...args: Parameters<typeof prettyDOM>) => void;
}

globalThis.log = (...args: unknown[]): void => {
  warn('\n');
  args.forEach((arg) => {
    warn(`🔴 ${inspect(arg, {colors: true, depth: 10})}`);
  });
  warn('\n');
};
globalThis.jlog = (...args: unknown[]): void => {
  args.forEach((arg) => {
    warn(`🔴 ${JSON.stringify(arg, null, 2)}`);
  });
};
globalThis.dlog = (...args: Parameters<typeof prettyDOM>): void => {
  log(prettyDOM(...args));
};
