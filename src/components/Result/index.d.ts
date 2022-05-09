/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 11:05:18
 * @LastEditTime: 2022-05-09 11:09:14
 */
import React from 'react';

import { sxType } from '../../types';

export interface ResultProps {
  icon?: React.ReactNode,
  title?: React.ReactNode,
  subTitle?: React.ReactNode,
  actions?: React.ReactNode | React.ReactNode[],
  status?: 'success' | 'error' | 'info' | 'warning' | '404',
  sx?: sxType
}

declare const Result: React.FunctionComponent<ResultProps>;

export default Result;
