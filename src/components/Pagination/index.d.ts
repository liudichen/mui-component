/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-07-22 10:46:33
 * @LastEditTime: 2022-07-22 11:14:14
 */
import React from 'react';
import { BoxProps, StackProps, SelectProps, PaginationProps as MuiPaginationProps } from '@mui/material';

export interface PaginationProps extends Omit<Omit< Omit<MuiPaginationProps, 'onChange'>, 'count'>, 'page'> {
  paginationBoxProps?: BoxProps,
  paginationStackProps?: StackProps,
  pageSizeSelectProps?: Omit<Omit<SelectProps, 'value'>, 'onChange'>,
  current?:number,
  total?: number,
  pageSize?: number,
  defaultPageSize?: number,
  showPageSize?: boolean,
  onPageChange?: (current: number) => void,
  onPageSizeChange?: (pageSize: number) => void,
  pageSizeOptions?: number[],
}

declare const Pagination: React.FunctionComponent<PaginationProps>;

export default Pagination;
