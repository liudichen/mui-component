import React from 'react';
import { SxProps } from '@mui/material';

export interface ResultProps {
  icon?: React.ReactNode,
  title?: React.ReactNode,
  subTitle?: React.ReactNode,
  actions?: React.ReactNode | React.ReactNode[],
  /** @default 'info' */
  status?: 'success' | 'error' | 'info' | 'warning' | '404',
  sx?: SxProps
}

declare const Result: React.FunctionComponent<ResultProps>;

export default Result;
