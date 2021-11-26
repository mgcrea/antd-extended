declare module '*.svg' {
  import {FunctionComponent, SVGAttributes} from 'react';
  const value: string;
  export const ReactComponent: FunctionComponent<SVGAttributes<SVGElement>>;
  export default value;
}
