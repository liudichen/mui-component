import React from 'react';
import { TableProps, BoxProps, TableFooterProps } from '@mui/material';
import { PaginationProps } from '../Pagination';

interface RowItem {
  [key: string]: any;
}

interface IGetterParams {
  row?: RowItem;
  rowIndex?: number;
  field?: string;
  value?: any;
}

interface ITitleRenderParams {
  field?: string;
}

interface IColumnType {
  field?: string;
  title?: React.ReactNode;
  renderTitle?: (parmas: ITitleRenderParams) => React.ReactNode;
  titleAlign?: 'center' | 'left' | 'right';
  align?: 'center' | 'left' | 'right';
  renderCell?: (params: IGetterParams) => React.ReactNode;
  type?: 'string' | 'number' | 'date' | 'select' | 'actions' | 'status' | 'dateTime' | 'boolean';
  width?: number | string;
  maxWidth?: number | string;
  minWidth?: number | string;
  valueGetter?: (params: IGetterParams) => any;
  getCellProps?: (params: IGetterParams) => object;
  ellipsis?: boolean;
  showTooltip?: boolean | ((params: IGetterParams) => boolean);
}

export interface SimpleTableProps extends TableProps {
  tableContainerBoxProps?: BoxProps;
  rows?: RowItem[];
  rowKey?: string;
  columns?: IColumnType[];
  title?: React.ReactNode;
  titlePosition?: 'top' | 'bottom' | 'inherit';
  hideHeader?: boolean;

  bordered?: boolean;
  columnDefaultWidth?: number | string;

  showFoot?: boolean;
  footProps?: TableFooterProps,
  footRender?: React.ReactNode | React.FunctionComponent | React.Component,
  hidePagination?: boolean,
  total?: number;
  current?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageChange?: (current: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  paginationProps?: Omit< Omit< Omit<Omit<Omit<PaginationProps, 'total'>, 'current'>, 'onPageChange'>, 'onPageSizeChange' >, 'pageSizeOptions' >;

  expandable?: boolean;
  showExpandColumn?: boolean;
  expandIcon?: [React.ReactNode, React.ReactNode];
  expandRowByClick?: boolean;
  expandColumnWidth?: number | string;
  expandRowRender?: (
    row: object,
    index: number,
    open: boolean
  ) => React.ReactNode;
  getRowExpandable?: (row: object, index: number) => boolean;
  unmountOnExit?: boolean;
}

declare const SimpleTable: React.FC<SimpleTableProps>;

export default SimpleTable;
