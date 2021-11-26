# antd-extended

## Features

- Adds several new sizes `x-small`, `x-large` and `xx-large` to most components
- Adds a new `secondary` type for buttons
- Adds `utc` mode to date-related pickers

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
