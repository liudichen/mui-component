/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-30 20:21:16
 * @LastEditTime: 2022-06-16 11:34:17
 */
import React from 'react';
import { TableProps, BoxProps, TablePaginationProps } from '@mui/material';


interface rowType {
  [key: string]: any
}

interface getterParams {
  row: rowType,
  rowIndex: number,
  field: string,
  value: any
}

interface titleParams {
  field: string
}

interface columnType {
  field?: string,
  title?: React.ReactNode,
  renderTitle?: (parmas: titleParams) => React.ReactNode,
  titleAlign?: 'center' | 'left' | 'right',
  align?: 'center' | 'left' | 'right',
  renderCell?: (params: getterParams) => React.ReactNode,
  type?: 'string' | 'number' | 'date' | 'select' | 'actions' | 'status' | 'dateTime',
  width?: number | string,
  maxWidth?: number | string,
  minWidth?: number | string,
  valueGetter?: (params: getterParams) => any,
  getCellProps?: (params: getterParams) => object,
  ellipsis?: boolean,
  showTooltip?: boolean,
}

export interface SimpleTableProps extends TableProps {
  tableContainerBoxProps?: BoxProps,
  rows?: rowType[],
  rowKey?: string,
  columns?: columnType[],
  title?: React.ReactNode,
  titlePosition?: 'top' | 'bottom' | 'inherit',
  hideHeader?: boolean,

  bordered?: boolean,
  columnDefaultWidth?: number | string,

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

declare const SimpleTable: React.FunctionComponent<SimpleTableProps>;

export default SimpleTable;
