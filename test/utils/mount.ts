import {prettyDOM} from '@testing-library/react';
import console from 'console';
import {ReactElement} from 'react';
import {render} from 'react-dom';
import {act} from 'react-dom/test-utils';

export const setupBeforeEach = (): void => {
  // container = document.createElement('div');
  // document.body.appendChild(container);
};
export const teardownAfterEach = (): void => {
  document.body.innerHTML = '';
};
export const setupTests = (): void => {
  // jest.useFakeTimers();
  beforeEach(setupBeforeEach);
  afterEach(teardownAfterEach);
};

export const debug = (...args: Parameters<typeof prettyDOM>): void => console.log(prettyDOM(...args));

export const mount = (element: ReactElement, callback?: () => void): Element => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  act(() => {
    render(element, container, callback);
  });
  return container;
};
