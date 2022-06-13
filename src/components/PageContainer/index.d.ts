/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 10:39:55
 * @LastEditTime: 2022-06-13 10:16:32
 */
import React from 'react';
import { CardProps } from '@mui/material';

import { sxType } from '../../types';

export interface PageContainerProps extends CardProps {
  border?: boolean,
  boxShadow?: boolean,
  content?: boolean, // true
  contentClass?: string,
  contentSx?: sxType,
  darkTitle?: boolean,
  secondary?: React.ReactNode,
  shadow?: string,
  sx?: sxType,
  title?: React.ReactNode,
}

declare const PageContainer: React.FunctionComponent<PageContainerProps>;

export default PageContainer;
