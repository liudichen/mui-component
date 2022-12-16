import React from 'react';
import { Grid, GridProps } from '@mui/material';

export interface GridLayoutProps extends Omit<GridProps, 'container'> {
  /** 其他传递给子组件<Grid item>的props
   * @default {alignItems:'center',justityContent:'center'}
   */
  itemProps?: Omit<GridProps, 'container' | 'item'>,
}

interface Cols {
  xs?: GridProps['xs'],
  sm?: GridProps['xs'],
  md?: GridProps['xs'],
  lg?: GridProps['xs'],
  xl?: GridProps['xs'],
}

const getMixCols = (parentCols: Cols, childProps?: Cols) => {
  const cols = { ...parentCols };
  const { xs, sm, md, lg, xl } = childProps || {};
  if (xs !== undefined) cols.xs = xs;
  if (sm !== undefined) cols.sm = sm;
  if (md !== undefined) cols.md = md;
  if (lg !== undefined) cols.lg = lg;
  if (xl !== undefined) cols.xl = xl;
  return cols;
};

/** 使用Grid布局的组件，传入xs/sm/md等值会自动传递给子元素套上<Grid item>(但如果子元素是Grid则会原样输出) */
export const GridLayout = (props: GridLayoutProps) => {
  const { itemProps, xs, sm, md, lg, xl, children, ...restProps } = props;
  const parentCols = { xs, sm, md, lg, xl };
  return (
    <Grid spacing={1} {...restProps} container>
      { React.Children.map(children, (child) => {
        if (!child) { return null; }
        // @ts-ignore
        if ([ 'Grid', 'Grid2' ].includes(child?.type?.displayName || child?.type?.render?.name)) {
          return child;
        }
        return (
        // @ts-ignore
          <Grid alignItems='center' justifyContent='center' {...(itemProps || {})} {...getMixCols(parentCols, child?.props)} item>
            {child}
          </Grid>
        );
      })}
    </Grid>
  );
};
