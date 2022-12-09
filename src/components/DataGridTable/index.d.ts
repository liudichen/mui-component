import React from 'react';
import { BoxProps, TooltipProps } from '@mui/material';
import { GridAlignment, GridColDef, GridColumnHeaderClassNamePropType, GridColumnHeaderParams, DataGridProps, GridValueGetterParams } from '@mui/x-data-grid';

import { DataGridPaginationProps } from './DataGridPagination';

/** 自定义的GridTableColumn条目类型 */
export type GridTableColumnType = Omit<GridColDef, 'type'> & {
  type?: 'string' | 'number' | 'date' | 'dateTime' | 'boolean' | 'singleSelect' | 'actions' | 'status',
  /** 自定义的用于 type='status */
  statusColorConvert?: (status: string) => string,
  /** 自定义的用于 type='status'*/
  statusTypeConvert?: (status: string) => string,
  /** 自定义的用于 type='status'*/
  statusTextConvert?: (status: string) => React.ReactNode,
  /** 自定义的用于 type='status'*/
  statusConvert?: (status: string) => string,
  title?: string,
  titleClassName?: GridColumnHeaderClassNamePropType,
  titleAlign?: GridAlignment,
  renderTitle?: (params: GridColumnHeaderParams) => React.ReactNode,
  /** 如果为真则提供tooltip包裹 */
  showTooltip?: boolean | ((params:GridValueGetterParams) => boolean),
  tooltipProps?: TooltipProps,
};

interface DataGridTableProps extends Omit<Omit<DataGridProps, 'columns'>, 'type'> {
  columns: GridTableColumnType[],
  /**
   * field name of row's id
   * @default 'id'
   */
  rowKey?: string,
  /**
   * table's height only when autoHeight !== true
   */
  height?: number | string,
  height?: string | number,
  initialPageSize?: number,
  paginationProps?: DataGridPaginationProps,
  rootProps?: BoxProps,

  /** getRowHeight : () => 'auto'的快捷props，并会自动添加行py */
  autoRowHeight?: boolean,
  /** 使用原始分页组件?
   * @default false
   */
  useDefaultPagination?: boolean,
}

/** 自定义的columns内容初始化转化func
 * @param col 输入的columns条目
 * @param prefix={align: 'center', headerAlign: 'center'} 初始配置
 * @param suffix 后置补充配置
*/
declare const initColumn: (col: GridTableColumnType, prefix?: GridTableColumnType, suffix?: GridTableColumnType) => GridTableColumnType;

/** 进行了一些自定义设置的@mui/x-data-grid表格组件 */
declare const DataGridTable: React.FC<DataGridTableProps>;

export {
  DataGridPaginationProps,
  DataGridTable,
  DataGridTableProps,
  initColumn,
  GridTableColumnType,
};

