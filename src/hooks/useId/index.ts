import React from 'react';
import { useSafeState } from 'ahooks';

let gloabalId = 0;

const useGlobalId = (idOverride?: number | string) => {
  const [ defaultId, setDefaultId ] = useSafeState(idOverride);
  const id = idOverride ?? defaultId;
  React.useEffect(() => {
    if (defaultId === null || defaultId === undefined) {
      gloabalId += 1;
      setDefaultId(`gId-${gloabalId}`);
    }
  }, [ defaultId ]);
  return `${id}`;
};

export const useId = (idOverride?: number | string) => {
  if (React?.useId) {
    const reactId = React.useId();
    return idOverride !== null && idOverride !== undefined ? `${idOverride}` : reactId;
  }
  return useGlobalId(idOverride);
};
