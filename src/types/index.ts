/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 10:30:34
 * @LastEditTime: 2022-05-09 10:30:55
 */
import * as React from 'react';
import { SxProps as sxType } from '@mui/material';

export {
  sxType,
};

type commonColorType = 'primary'| 'default' | 'secondary' | 'error' | 'info' | 'success' |'warning';
export type colorType = commonColorType | string;

export interface LabelRenderProps {
  label?: React.ReactNode;
  tooltip?: React.ReactNode;
  labelPosition: 'top' | 'border';
  required?: boolean;
  labelSx?: object;
  labelProps?: object;
}
