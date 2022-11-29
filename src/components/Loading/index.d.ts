import React from 'react';
import { CircularProgressProps, SxProps, BoxProps, TypographyProps } from '@mui/material';

export interface LoadingProps extends CircularProgressProps {
  /**
   * 包裹在最外层的Box组件的Sx
   * @deprecated 推荐直接使用containerProps
   */
  containerSx?: SxProps,
  /** 包裹在最外层的Box组件的props
   * @default {position:'relative',display:'inline-block'}
  */
  containerProps?: BoxProps,
  /** CircularProgress组件中心的文本label(优先级：value>label>children)*/
  label?: React.ReactNode,
  /** 包裹 CircularProgress组件中心内容的Box组件的props
   * @default {top:0,left:0,right:0,bottom:0,position:'absolute',display:'flex',alignItems:'center',justifyContent:'center'}
  */
  labelBoxProps?: BoxProps,
  /** 包裹 CircularProgress组件中心内容的Typography组件的props
   * @default {variant:'caption',component:'div',color:'GrayText.secondary'}
  */
  labelTypographyProps?: TypographyProps,
}

declare const Loading: React.FC<React.PropsWithChildren<LoadingProps>>;

export default Loading;
