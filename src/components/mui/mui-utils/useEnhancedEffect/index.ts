// from @mui/utils%5.10.15 https://github.com/mui/material-ui/tree/master/packages/mui-utils

import React from "react";

export const useEnhancedEffect: (effect: React.EffectCallback, deps?: React.DependencyList) => void =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
