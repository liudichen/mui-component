import React from 'react';
import { SxProps } from '@mui/material';

type stringSize = 'small' | 'medium' | 'large';
type sizeType = stringSize | number;
type sizeProp = sizeType | [sizeType, sizeType];

export interface SpaceProps {
  size?: sizeProp;
  direction?: 'row' | 'column';
  flexDirection?: any;
  split?: React.ReactNode;
  display?: string,
  /**
   * sx add to root Box
   * @default {justifyContent:'center'}
   */
  sx: SxProps,
}

declare const Space: React.FunctionComponent<SpaceProps>;

export default Space;
