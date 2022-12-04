import React from 'react';
import { CardProps, SxProps } from '@mui/material';

export interface PageContainerProps extends CardProps {
  /** 显示边框?
   * @default true
   */
  border?: boolean,
  boxShadow?: boolean,
  /** 显示children内容？
   * @default true
  */
  content?: boolean,
  contentClass?: string,
  contentSx?: SxProps,
  darkTitle?: boolean,
  secondary?: React.ReactNode,
  shadow?: string,
  sx?: SxProps,
  title?: React.ReactNode,
}

export declare const PageContainer: React.FC<React.PropsWithChildren<PageContainerProps>>;
