import React, {FunctionComponent} from 'react';
import {Story} from '@storybook/react';
import styled from 'styled-components';

export const Fixture = styled.img.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => !['opacity'].includes(prop) && defaultValidatorFn(prop),
})<{opacity?: number}>`
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${({opacity}) => opacity};
  transform-origin: top left;
  transform: scale(0.5);
  padding: 2rem;
  pointer-events: none;
`;

export function templateWithFixture<P>(Component: FunctionComponent<P>, fixtureSrc?: string): Story<P> {
  const StoryWithFixture: Story<P> = (args, context) => {
    console.warn(context.globals);
    const {opacity = 0} = context.globals.fixture || {};
    return (
      <section>
        <Component {...args} />
        {fixtureSrc && opacity ? <Fixture src={fixtureSrc} alt="fixture" opacity={opacity} /> : null}
      </section>
    );
  };
  return StoryWithFixture;
}
