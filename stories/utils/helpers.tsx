/* eslint-disable @typescript-eslint/no-explicit-any */
import {useArgs} from '@storybook/addons';
import {ComponentStory} from '@storybook/react';
import React, {ComponentProps, JSXElementConstructor, useEffect, useState} from 'react';
import {StoryContainer} from './components';
import {storybookSizeOptions} from './size';

type LocalStateOptions = {
  valueExtractor?: (...args: any[]) => any;
  argValueInjector?: (...args: any[]) => any;
  argValueExtractor?: (...args: any[]) => any;
  labelExtractor?: (...args: any[]) => string;
  valuePropName?: string;
  trigger?: string;
};

export function withLocalState<T extends JSXElementConstructor<P>, P extends {[s: string]: any}>(
  story: ComponentStory<T>,
  options: LocalStateOptions = {},
) {
  const {
    valueExtractor,
    argValueInjector,
    argValueExtractor,
    labelExtractor,
    valuePropName = 'value',
    trigger = 'onChange',
  } = options;
  const WrappedStory: ComponentStory<T> = (props, context) => {
    const {[valuePropName]: valueProp, [trigger]: onChangeProp, ...otherProps} = props;
    const [_args, updateArgs] = useArgs();
    const [value, setValue] = useState<any>(argValueInjector ? argValueInjector(valueProp) : valueProp);
    const onChange: (...args: any[]) => any = (...args) => {
      const value = valueExtractor ? valueExtractor(...args) : args[0];
      typeof valueProp !== 'undefined'
        ? updateArgs({[valuePropName]: argValueExtractor ? argValueExtractor(value) : value})
        : setValue(value);
      onChangeProp && onChangeProp(...args);
    };
    useEffect(() => {
      setValue(argValueInjector ? argValueInjector(valueProp) : valueProp);
    }, [valueProp]);

    return (
      <div style={{textAlign: 'center'}}>
        {story({[trigger]: onChange, [valuePropName]: value, ...otherProps} as ComponentProps<T>, context)}
        <div style={{textAlign: 'center'}}>
          <small>
            {valuePropName}={labelExtractor ? labelExtractor(value) : String(value)}
          </small>
        </div>
      </div>
    );
  };

  return WrappedStory;
}

export function sizeTemplate<T extends JSXElementConstructor<P>, P extends {[s: string]: any}>(
  template: ComponentStory<T>,
) {
  return declineTemplate<T, P>(template, {name: 'size', options: storybookSizeOptions});
}

type DeclineTemplateOptions = {
  name: string;
  options: any[];
};
export function declineTemplate<T extends JSXElementConstructor<P>, P extends {[s: string]: any}>(
  template: ComponentStory<T>,
  {name, options}: DeclineTemplateOptions,
) {
  const labelValue = (value): string => {
    switch (typeof value) {
      case 'boolean':
        return value ? 'true' : 'false';
      case 'string':
        return `"${value}"`;
      default:
        return value;
    }
  };

  const WrappedStory: ComponentStory<T> = (props, context) => {
    return (
      <StoryContainer>
        {options.map((value) => {
          return (
            <div key={`${value}`}>
              <div style={{textAlign: 'center'}}>
                <small>
                  {name}={labelValue(value)}
                </small>
              </div>
              {template({...props, [name]: value}, context)}
            </div>
          );
        })}
      </StoryContainer>
    );
  };
  WrappedStory.argTypes = {[name]: {control: {type: null}}};

  return WrappedStory;
}
