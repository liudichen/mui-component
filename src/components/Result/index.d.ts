import React from 'react';
import { SxProps } from '@mui/material';

import { ContentCardProps } from '../ContentCard';
import { SpaceProps } from '../Space';

export interface ResultProps extends ContentCardProps {
  icon?: React.ReactNode,
  title?: React.ReactNode,
  subTitle?: React.ReactNode,
  actions?: React.ReactNode | React.ReactNode[],
  /** @default 'info' */
  status?: 'success' | 'error' | 'info' | 'warning' | '404',
  sx?: SxProps,
  spaceProps?: SpaceProps,
}

declare const Result: React.FC<React.PropsWithChildren<ResultProps>>;

export default Result;
