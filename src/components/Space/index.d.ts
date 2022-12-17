import React from 'react';
import { SxProps, BoxProps } from '@mui/material';

type stringSize = 'small' | 'medium' | 'large';
type sizeType = stringSize | number;
type sizeProp = sizeType | [sizeType, sizeType];

export interface SpaceProps extends Omit<BoxProps, 'flexDirection'> {
  /** 最多接受2个值(横向间距\竖向间距)
   * @example
   * ```
   * size=8
   * size='small'
   * size=[8,'large']
   * size=[16,24]
   * size=['small','medium']
   * ```
  */
  size?: sizeProp;
  /** 子元素排列方向 */
  direction?: 'row' | 'column';
  split?: React.ReactNode;
  /**
   * sx add to root Box
   * @default {justifyContent:'center'}
   */
  sx?: SxProps,
}

export declare const Space: React.FC<React.PropsWithChildren<SpaceProps>>;
