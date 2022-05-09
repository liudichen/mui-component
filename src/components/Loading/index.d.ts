/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 11:20:01
 * @LastEditTime: 2022-05-09 11:24:15
 */
import React from 'react';
import { CircularProgressProps } from '@mui/material';

import { sxType } from '../../types';

export interface LoadingProps extends CircularProgressProps {
  containerSx?: sxType,
  label?: React.ReactNode,
}

declare const Loading: React.FunctionComponent<LoadingProps>;

export default Loading;
