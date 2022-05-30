/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-30 20:21:16
 * @LastEditTime: 2022-05-30 20:44:59
 */
import React from 'react';
import { TableProps, BoxProps, TablePaginationProps } from '@mui/material';

interface columnType {
  field?: string,
  title?: React.ReactNode,
  renderTitle?: (parmas?: {field?: string}) => React.ReactNode,
  titleAlign?: 'center' | 'left' | 'right',
  align?: 'center' | 'left' | 'right',
  renderCell?: (params?: {row?: object, rowIndex?: number, field?: string, value?: any}) => React.ReactNode,
  type?: 'string' | 'number' | 'date' | 'select' | 'actions' | 'status',
  width?: number | string,
  maxWidth?: number | string,
  minWidth?: number | string,
  valueGetter?: (params?: {row?: object, rowIndex?: number, field?: string, value?: any}) => any,
  getCellProps?: (params?: {row?: object, rowIndex?: number, field?: string, value?: any}) => object,
  ellipsis?: boolean,
  showTooltip?: boolean,
}

export interface SimpleTableProps extends TableProps {
  tableContainerBoxProps?: BoxProps,
  rows?: object,
  rowKey?: string,
  columns?: columnType[],
  title?: React.ReactNode,
  titlePosition?: 'top' | 'bottom' | 'inherit',
  hideHeader?: boolean,

  hideFooter?: boolean,
  total?: number,
  current?: number,
  pageSize?: number,
  pageSizeOptions?: number[],
  onPageChange?: (current: number) => void,
  onPageSizeChange?: (pageSize: number) => void,
  paginationProps?: Omit<Omit<Omit<Omit<Omit<Omit<Omit<TablePaginationProps, 'colSpan'>, 'count'>, 'page'>, 'rowsPerPage'>, 'rowsPerPageOptions'>, 'onPageChange'>, 'onRowsPerPageChange'>,

  expandable?: boolean,
  showExpandColumn?: boolean,
  expandIcon?: [React.ReactNode, React.ReactNode],
  expandRowByClick?: boolean,
  expandColumnWidth?: number | string,
  expandRowRender?: (row: object, index: number, open: boolean) => React.ReactNode,
  getRowExpandable?:(row: object, index: number) => boolean,
  unmountOnExit?: boolean,
}

declare const SimpleTable: React.FunctionComponent<TablePaginationProps>;

export default SimpleTable;
