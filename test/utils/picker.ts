/* eslint-env jest, jasmine */

import assert from 'assert';
import console from 'console';
import {act, Simulate} from 'react-dom/test-utils';

let lastOpenedIndex = 0;
// let lastContainer = document.createElement('div');

export const toggleOpen = (index = 0): void => {
  const nodeList = document.body.querySelectorAll('.ant-picker-input > input');
  assert(nodeList && nodeList.length > index);
  act(() => {
    Simulate.mouseDown(nodeList[index]);
  });
  lastOpenedIndex = index;
};

export const blurPicker = (index = 0): void => {
  const nodeList = document.body.querySelectorAll('.ant-picker-input > input');
  assert(nodeList && nodeList.length > index);
  act(() => {
    Simulate.blur(nodeList[index]);
  });
  lastOpenedIndex = index;
};

export const selectVisibleItemIndex = (index = 0): void => {
  const selector = document.body.querySelectorAll('.ant-select-item-option-content');
  assert(selector.length > index);
  Simulate.click(selector[index]);
};

export const addMultipleRangeSelectRow = (): void => {
  // debug(document.body);
  const selector = document.body.querySelector('.ant-time-select-add-range');
  assert(selector);
  Simulate.click(selector);
};

export const getInputElement = (index = lastOpenedIndex): HTMLInputElement => {
  const inputList = document.body.querySelectorAll<HTMLInputElement>('.ant-picker-input > input');
  assert(inputList && inputList.length > index);
  const input = inputList[index];
  return input;
};

export const getTimePanelColumn = (index = lastOpenedIndex): HTMLDivElement => {
  const dropdownList = document.body.querySelectorAll<HTMLDivElement>('ul.ant-picker-time-panel-column');
  assert(dropdownList && dropdownList.length > index);
  const dropdown = dropdownList[index];
  return dropdown;
};

export const getOptionItemByLabel = (label: string, index = lastOpenedIndex): Element | null => {
  const dropdown = getTimePanelColumn(index);
  const options = Array.from(dropdown.querySelectorAll('.ant-picker-time-panel-cell'));
  const option = options.find((element) => element.textContent === label);
  return option || null;
};

// export const getOptionItemByLabel = (label: string, index = lastOpenedIndex): Element | null => {
//   const input = getInputElement(index);
//   const dropdown = getDropdownElement(index);
//   act(() => {
//     Simulate.change(input, {target: ({value: label} as unknown) as EventTarget});
//   });
//   const options = Array.from(dropdown.querySelectorAll('.ant-select-item-option-content'));
//   const option = options.find((element) => element.textContent === label);
//   return option || null;
// };

export const selectOptionItemByLabel = (label: string, index = lastOpenedIndex): void => {
  const option = getOptionItemByLabel(label, index);
  assert(option);
  act(() => {
    Simulate.click(option, {bubbles: true});
  });
};

export const debugDropdown = (index = lastOpenedIndex): void => {
  const dropdowns = document.body.querySelectorAll('.ant-select-dropdown');
  assert(dropdowns.length > index);
  const options = Array.from(dropdowns[index].querySelectorAll('.ant-select-item-option-content'));
  console.dir(
    options.map((element) => element.textContent),
    {colors: true},
  );
};
