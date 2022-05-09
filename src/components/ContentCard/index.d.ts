/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 10:51:55
 * @LastEditTime: 2022-05-09 11:00:07
 */
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
  ref?: React.Ref,
  defaultCollapsed?: boolean,
  collapsible?: boolean,
  collapsed?: boolean,
  handleCollapse?: () => void,
  headerSx?: sxType,
  contentSx?: sxType,
  iconColor?: colorType,
  CollapseIcon?: React.Component | React.FunctionComponent | React.ReactNode,
  unmountOnExit?: boolean,
}

declare const ContentCard: React.FunctionComponent<ContentCardProps>;

export default ContentCard;
