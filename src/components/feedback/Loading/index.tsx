import type { ReactNode, PropsWithChildren } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import type { CircularProgressProps, SxProps, BoxProps, TypographyProps } from "@mui/material";

export interface LoadingProps extends CircularProgressProps {
  /**
   * 包裹在最外层的Box组件的Sx
   * @deprecated 推荐直接使用containerProps
   */
  containerSx?: SxProps;
  /** 包裹在最外层的Box组件的props
   * @default {position:'relative',display:'inline-block',overflow:'hidden'}
   */
  containerProps?: BoxProps;
  /** CircularProgress组件中心的文本label(优先级：value>label>children)*/
  label?: ReactNode;
  /** 包裹 CircularProgress组件中心内容的Box组件的props
   * @default {top:0,left:0,right:0,bottom:0,position:'absolute',display:'flex',alignItems:'center',justifyContent:'center'}
   */
  labelBoxProps?: BoxProps;
  /** 包裹 CircularProgress组件中心内容的Typography组件的props
   * @default {variant:'caption',component:'div',color:'GrayText.secondary'}
   */
  labelTypographyProps?: TypographyProps;
}

export const Loading = (props: PropsWithChildren<LoadingProps>) => {
  const {
    label = "",
    value,
    color = "secondary",
    size = 40,
    variant = "indeterminate",
    sx,
    containerProps,
    labelBoxProps,
    labelTypographyProps,
    children,
    ...restProps
  } = props;
  return (
    <Box position="relative" display="inline-block" overflow="hidden" {...(containerProps || {})}>
      <CircularProgress
        color={color}
        value={value}
        variant={variant}
        size={size}
        sx={sx}
        thickness={3.6}
        {...restProps}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        {...(labelBoxProps || {})}
      >
        {(typeof value !== "undefined" || !!label || !!children) && (
          // @ts-ignore
          <Typography variant="caption" component="div" color="GrayText.secondary" {...(labelTypographyProps || {})}>
            {typeof value === "undefined" ? label || children : `${Math.round(value)}%`}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
