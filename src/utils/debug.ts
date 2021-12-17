import {useEffect, useRef} from 'react';

export const useDebugEffect = (deps: Record<string, unknown> = {}) => {
  const lastDeps = useRef({...deps});
  useEffect(() => {
    Object.keys(deps).forEach((dep) => {
      if (deps[dep] !== lastDeps.current[dep]) {
        console.log(`Dependency "${dep}" has changed, prevValue=${lastDeps.current[dep]}, nextValue=${deps[dep]}!`);
      }
    });
    lastDeps.current = {...deps};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, Object.values(deps));
};

export const useRenderCount = () => {
  const renderCount = useRef(0);
  renderCount.current = renderCount.current + 1;
  return [renderCount.current];
};
