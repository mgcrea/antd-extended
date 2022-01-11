<!-- markdownlint-disable no-inline-html -->

# antd-extended

<p align="center">
  <a href="https://www.npmjs.com/package/@mgcrea/antd-extended">
    <img src="https://img.shields.io/npm/v/@mgcrea/antd-extended.svg?style=for-the-badge" alt="npm version" />
  </a>
  <!-- <a href="https://www.npmjs.com/package/@mgcrea/antd-extended">
    <img src="https://img.shields.io/npm/dt/@mgcrea/antd-extended.svg?style=for-the-badge" alt="npm total downloads" />
  </a> -->
  <a href="https://www.npmjs.com/package/@mgcrea/antd-extended">
    <img src="https://img.shields.io/npm/dm/@mgcrea/antd-extended.svg?style=for-the-badge" alt="npm monthly downloads" />
  </a>
  <a href="https://www.npmjs.com/package/@mgcrea/antd-extended">
    <img src="https://img.shields.io/npm/l/@mgcrea/antd-extended.svg?style=for-the-badge" alt="npm license" />
  </a>
  <a href="https://github.com/mgcrea/antd-extended/actions/workflows/main.yml">
    <img src="https://img.shields.io/github/workflow/status/mgcrea/antd-extended/main?style=for-the-badge" alt="github main workflow" />
  </a>
</p>

## Features

- Uses [dayjs](https://github.com/iamkun/dayjs/) instead of [moment](https://github.com/moment/moment/) for all date-related pickers
- Adds several new sizes `x-small`, `x-large` and `xx-large` to most components
- Adds a new `secondary` type for buttons
- Adds new `utc` and `startOf` options to date-related pickers
- Adds new `isBefore` and `isAfter` options to the `<TimePicker />`
- Adds a new `<Checkbox.Button />` component to bring button styles to checkboxes

## Docs

- [Storybook](https://mgcrea.github.io/antd-extended)

## Install

```sh
npm install @mgcrea/antd-extended
```

## Quickstart

```tsx
import React from 'react';
import {Button} from '@mgcrea/antd-extended';
import '@mgcrea/antd-extended/lib/esm/index.css'; // optional

function App() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <Button size="x-small">X-Small</Button>
      <Button type="secondary" size="x-large">
        X-Large
      </Button>
    </div>
  );
}
```

## Dynamic style import configuration

Like the original `antd` package, `@mgcrea/antd-extended` ships with `.less` styles that you may want to import in your app.

### Babel plugin

Using [babel-plugin-import](https://github.com/umijs/babel-plugin-import):

```js
// babel.config.js
plugins: [
  ['import', {libraryName: '@mgcrea/antd-extended', libraryDirectory: 'lib/esm', style: (name) => { return [`antd/es/${name}/style/index.less`, `@mgcrea/antd-extended/lib/esm/${name}/style/index.less`]; }}, '@mgcrea/antd-extended'],
],
```

### Vite plugin

Using [vitePluginImp](https://github.com/onebay/vite-plugin-imp):

```js
// vite.config.js
plugins: [
  vitePluginImp({
    libList: [
      {
        libName: '@mgcrea/antd-extended',
        replaceOldImport: false,
        style: (name) => {
          return [`antd/es/${name}/style/index.less`, `@mgcrea/antd-extended/lib/esm/${name}/style/index.less`];
        },
      },
    ],
  }),
],
```
