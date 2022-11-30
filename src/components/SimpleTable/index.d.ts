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
  /** 表格的caption标题内容 */
  title?: React.ReactNode;
  /** 表格标题caption的位置
   * @default 'top'
   */
  titlePosition?: 'top' | 'bottom' | 'inherit';
  hideHeader?: boolean;

  bordered?: boolean;
  /** 设定表格列的默认宽度
   * @default 100
   */
  columnDefaultWidth?: number | string;

  /** 显示表格的TableFooter?
   * 需配合tableFooter使用
   * @default false
   */
  showTableFooter?: boolean;
  /** 表格TalbleFooter的props */
  tableFooterProps?: TableFooterProps,
  /** tableFoot的内容 */
  tableFooter?: React.ReactNode,
  /** 隐藏表格页码区域? */
  hidePagination?: boolean,
  /** 自动隐藏页码区域? */
  autoHidePagination?: boolean,
  /** 总行数 */
  total?: number;
  /** 当前页码 */
  current?: number;
  /** 每页行数 */
  pageSize?: number;
  /** 每页行数大小选项列表 */
  pageSizeOptions?: number[];
  onPageChange?: (current: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  paginationProps?: Omit< Omit< Omit<Omit<Omit<PaginationProps, 'total'>, 'current'>, 'onPageChange'>, 'onPageSizeChange' >, 'pageSizeOptions' >;

  /** 可展开行? */
  expandable?: boolean;
  /** 显示展开行的按钮列?
   * @default true
   */
  showExpandColumn?: boolean;
  /** 展开行的按钮 */
  expandIcon?: [React.ReactNode, React.ReactNode];
  /** 可通过点击行的内容展开行?
   * @default false
   */
  expandRowByClick?: boolean;
  /** 展开按钮列的宽度
   * @default 45
   */
  expandColumnWidth?: number | string;
  expandRowRender?: (
    row: object,
    index: number,
    open: boolean
  ) => React.ReactNode;
  getRowExpandable?: (row: object, index: number) => boolean;
  /** 展开行内容关闭时卸载组件?
   * @default false
  */
  unmountOnExit?: boolean;
}

declare const SimpleTable: React.FC<SimpleTableProps>;

export default SimpleTable;
