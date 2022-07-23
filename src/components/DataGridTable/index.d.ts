/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 15:47:54
 * @LastEditTime: 2022-07-23 16:13:41
 */
import React from 'react';
import { BoxProps, TooltipProps } from '@mui/material';
import { GridAlignment, GridColDef, GridColumnHeaderClassNamePropType, GridColumnHeaderParams, DataGridProps, GridValueGetterParams } from '@mui/x-data-grid';

import { DataGridPaginationProps } from './DataGridPagination';

type columnType = Omit<GridColDef, 'type'> & {
  type: 'string' | 'number' | 'date' | 'dateTime' | 'boolean' | 'singleSelect' | 'actions' | 'status',
  statusColorConvert: (status: string) => string, // 自定义的用于 type='status'
  statusTypeConvert: (status: string) => string, // 自定义的用于 type='status'
  statusTextConvert: (status: string) => React.ReactNode, // 自定义的用于 type='status'
  statusConvert: (status: string) => string, // 自定义的用于 type='status'
  title?: string,
  titleClassName?: GridColumnHeaderClassNamePropType,
  titleAlign?: GridAlignment,
  renderTitle?: (params: GridColumnHeaderParams) => React.ReactNode,
  showTooltip?: boolean | ((params:GridValueGetterParams) => boolean), // 如果为真则提供tooltip包裹
  tooltipProps?: TooltipProps,
};

interface DataGridTableProps extends Omit<Omit<DataGridProps, 'columns'>, 'type'> {
  columns: columnType[],
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
}

declare const initColumn: (col: columnType, prefix?: columnType, suffix?: columnType) => columnType;

declare const DataGridTable: React.FunctionComponent<DataGridTableProps>;

export {
  DataGridPaginationProps,
  DataGridTableProps,
  initColumn,
  columnType,
};

export default DataGridTable;
