/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 15:47:54
 * @LastEditTime: 2022-05-09 17:06:11
 */
import React from 'react';
import { BoxProps } from '@mui/material';
import { GridAlignment, GridColDef, GridColumnHeaderClassNamePropType, GridColumnHeaderParams, DataGridProps } from '@mui/x-data-grid';

import { DataGridPaginationProps } from './DataGridPagination';

type columnType = GridColDef & {
  title?: string,
  titleClassName?: GridColumnHeaderClassNamePropType,
  titleAlign?: GridAlignment,
  renderTitle?: (params: GridColumnHeaderParams) => React.ReactNode,
};

interface DataGridTableProps extends Omit<DataGridProps, 'columns'> {
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
