import React from 'react';
import type { TableProps, BoxProps, TableFooterProps } from '@mui/material';

import type { PaginationProps } from '../Pagination';
import type { IStatusConvertRelateProps } from '../StatusRender';

interface RowItem {
  [key: string]: any;
}

interface IGetterParams<R extends RowItem = any> {
  row?: R;
  rowIndex?: number;
  field?: string;
  value?: any;
}

interface ITitleRenderParams {
  field?: string;
}

interface IColumnType<R extends RowItem = any> extends IStatusConvertRelateProps {
  field?: string;
  title?: React.ReactNode;
  renderTitle?: (parmas: ITitleRenderParams) => React.ReactNode;
  titleAlign?: 'center' | 'left' | 'right';
  align?: 'center' | 'left' | 'right';
  renderCell?: (params: IGetterParams<R>) => React.ReactNode;
  type?: 'string' | 'number' | 'date' | 'select' | 'actions' | 'status' | 'dateTime' | 'boolean';
  width?: number | string;
  maxWidth?: number | string;
  minWidth?: number | string;
  valueGetter?: (params: IGetterParams<R>) => any;
  getCellProps?: (params: IGetterParams<R>) => object;
  ellipsis?: boolean;
  showTooltip?: boolean | ((params: IGetterParams<R>) => boolean);
}

export interface SimpleTableProps<R extends RowItem = any> extends TableProps {
  /** table外包裹的Box组件的props */
  tableContainerBoxProps?: BoxProps;
  /** 初始每页行数 */
  initPageSize?: number,
  rows?: R[];
  /** 行数据key的Id */
  rowKey?: string;
  columns?: IColumnType<R>[];
  /** 表格的caption标题内容 */
  title?: React.ReactNode;
  /** 表格标题caption的位置
   * @default 'top'
   */
  titlePosition?: 'top' | 'bottom' | 'inherit';
  /** 隐藏表头? */
  hideHeader?: boolean;

  /** 显示表格框线? */
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
  /** 传递给Pagination组件的props
   * @default { siblingCount: 1 }
   */
  paginationProps?: Omit<PaginationProps, 'total' | 'current' | 'onPageChange' | 'onPageSizeChange' | 'pageSizeOptions' >,

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
    row: R,
    index?: number,
    open?: boolean
  ) => React.ReactNode;
  getRowExpandable?: (row: R, index?: number) => boolean;
  /** 展开行内容关闭时卸载组件?
   * @default false
  */
  unmountOnExit?: boolean;
}

export declare const SimpleTable: React.FC<SimpleTableProps>;
