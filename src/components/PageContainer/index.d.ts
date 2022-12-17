import React from 'react';
import type { CardProps, SxProps } from '@mui/material';

export interface PageContainerProps extends CardProps {
  /** 显示边框?
   * @default true
   */
  border?: boolean,
  boxShadow?: boolean,
  /** 用CardContent包裹children内容？
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
  /** 传递给CardHeader，即title的外层的sx */
  headerSx?: SxProps
}

export declare const PageContainer: React.FC<React.PropsWithChildren<PageContainerProps>>;
