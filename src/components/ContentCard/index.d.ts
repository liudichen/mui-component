import React from 'react';
import { CardProps } from '@mui/material';

import { colorType, sxType } from '../../types';

export interface ContentCardProps extends CardProps {
  content?: boolean, // true
  contentClass?: string,
  contentSx?: sxType,
  darkTitle?: boolean,
  secondary?: React.ReactNode,
  sx?: sxType,
  title?: React.ReactNode,
  defaultCollapsed?: boolean,
  collapsible?: boolean,
  /** 受控属性 ，与handleCollapse配合使用*/
  collapsed?: boolean,
  /** 受控属性 ，与collapsed配合使用*/
  handleCollapse?: () => void,
  headerSx?: sxType,
  contentSx?: sxType,
  iconColor?: colorType,
  CollapseIcon?: React.Component | React.FunctionComponent | React.ReactNode,
  unmountOnExit?: boolean,
}

declare const ContentCard: React.FunctionComponent<ContentCardProps>;

export default ContentCard;
