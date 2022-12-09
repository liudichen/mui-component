import React from "react";
import { SvgIcon, SvgIconProps } from '@mui/material'

type SvgIconColorType = SvgIconProps['color']

export interface IconProps extends Omit<SvgIconProps, 'color'> {
  /**传递给 svg的height和width */
  size?: number | string,
  /**扩展了原颜色，如果传普通颜色会自动传递给htmlColor */
  color?: SvgIconColorType | string,
}

const COLORS = ['inherit', 'action', 'disabled', 'primary', 'secondary', 'error', 'info', 'success', 'warning']

export const IconWrapper = (props: IconProps) => {
  const {
    color, size = 24,
    htmlColor,
    sx,
    ...restProps
  } = props
  const Color = (color && COLORS.includes(color) ? color : undefined) as SvgIconColorType
  const HtmlColor = htmlColor ?? (color && !COLORS.includes(color) ? color : undefined)
  return (
    <SvgIcon
      color={Color}
      htmlColor={HtmlColor}
      sx={{ height: size, width: size, ...(sx || {}) }}
      {...restProps}
    />
  )
}