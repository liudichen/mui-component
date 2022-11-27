import React from 'react';
import { CardProps, SxProps } from '@mui/material';

export interface ContentCardProps extends CardProps {
  content?: boolean, // true
  contentClass?: string,
  contentSx?: SxProps,
  darkTitle?: boolean,
  secondary?: React.ReactNode,
  sx?: SxProps,
  title?: React.ReactNode,
  defaultCollapsed?: boolean,
  collapsible?: boolean,
  /** 受控属性 ，与handleCollapse配合使用*/
  collapsed?: boolean,
  /** 受控属性 ，与collapsed配合使用*/
  handleCollapse?: () => void,
  headerSx?: SxProps,
  contentSx?: SxProps,
  iconColor?: 'primary'| 'default' | 'secondary' | 'error' | 'info' | 'success' |'warning',
  CollapseIcon?: React.Component | React.FunctionComponent | React.ReactNode,
  unmountOnExit?: boolean,
}

declare const ContentCard: React.FunctionComponent<ContentCardProps>;

export default ContentCard;
