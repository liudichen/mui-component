import React from 'react';
import { BoxProps, StackProps, SelectProps, PaginationProps as MuiPaginationProps } from '@mui/material';

export interface PaginationProps extends Omit<Omit< Omit<MuiPaginationProps, 'onChange'>, 'count'>, 'page'> {
  /** 包裹在外部的Box的props */
  paginationBoxProps?: BoxProps,
  /** 包裹在次外层的Stack的Props
   * @default {direction:'row',alignItems:'center',spacing:0.5}
   */
  paginationStackProps?: StackProps,
  /** 选择每页行数的Select组件的Props */
  pageSizeSelectProps?: Omit<Omit<SelectProps, 'value'>, 'onChange'>,
  current?:number,
  total?: number,
  pageSize?: number,
  defaultPageSize?: number,
  /** 显示选择每页多少行的选择框 */
  showPageSize?: boolean,
  showItemRange?: boolean,
  onPageChange?: (current: number) => void,
  onPageSizeChange?: (pageSize: number) => void,
  /** 每页行数选项
   * @default [ 10, 25, 50, 100, 200 ]
   */
  pageSizeOptions?: number[],
}

declare const Pagination: React.FunctionComponent<PaginationProps>;

export default Pagination;
