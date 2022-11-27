import React from 'react';
import { CircularProgressProps, SxProps } from '@mui/material';

export interface LoadingProps extends CircularProgressProps {
  containerSx?: SxProps,
  label?: React.ReactNode,
}

declare const Loading: React.FunctionComponent<LoadingProps>;

export default Loading;
