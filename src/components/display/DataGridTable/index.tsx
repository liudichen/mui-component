import React from 'react';
import { useCreation } from 'ahooks';
import { Box, Tooltip } from '@mui/material';
import type { BoxProps, TooltipProps } from '@mui/material';
import { DataGrid, zhCN } from '@mui/x-data-grid';
import type { GridAlignment, GridColDef, GridColumnHeaderClassNamePropType, GridColumnHeaderParams, DataGridProps, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid';
import dayjs from 'dayjs';

import { NoData as NoRowsOverlay } from '../NoData';
import { DataGridPagination } from './DataGridPagination';
import { StatusRender } from '../StatusRender';
import type { DataGridPaginationProps } from './DataGridPagination';
import type { IStatusConvertRelateProps } from '../StatusRender';


export const initColumn = (col: DataGridTableColumn, prefix: Partial<DataGridTableColumn> = {}, suffix: Partial<DataGridTableColumn> = {}) => {
  const { titleAlign, title, titleClassName, renderTitle, type, statusColorConvert, statusTypeConvert, statusTextConvert, statusConvert, showTooltip, tooltipProps, ...restCol } = col;
  const initInfo = {
    align: 'center', headerAlign: 'center',
    ...(prefix || {}),
  };
  if (type) {
    if (![ 'status', 'date', 'dateTime' ].includes(type)) {
      initInfo.type = type;
    } else if (type === 'status') {
      initInfo.renderCell = ({ value }) => (
        <StatusRender
          status={value}
          statusColorConvert={statusColorConvert}
          statusTextConvert={statusTextConvert}
          statusTypeConvert={statusTypeConvert}
          statusConvert={statusConvert}
        />
      );
      if (typeof initInfo.width === 'undefined') { initInfo.width = 70; }
    } else {
      initInfo.type = type;
      initInfo.width = type === 'date' ? 100 : 160;
      initInfo.renderCell = ({ value }) => (value ? dayjs(value).format(type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss') : '-');
    }
  }
  if (titleAlign) { initInfo.headerAlign = titleAlign; }
  if (title) { initInfo.headerName = title; }
  if (titleClassName) { initInfo.headerClassName = titleClassName; }
  if (renderTitle) { initInfo.renderHeader = renderTitle; }
  if (showTooltip) {
    if (showTooltip === true) {
      const { title: tl, ...restTooltipProps } = tooltipProps || {};
      initInfo.renderCell = ({ value }: GridRenderCellParams<number | string>) => (
        value ? <Tooltip title={tl || value} arrow placement='top' {...restTooltipProps}>
          <span>{value}</span>
        </Tooltip> : null
      );
    } else if (typeof showTooltip === 'function') {
      initInfo.renderCell = (params: GridRenderCellParams<number | string>) => {
        if (showTooltip(params)) {
          const { value } = params;
          const { title: tl, ...restTooltipProps } = tooltipProps || {};
          return (value !== null && value !== undefined) ? <Tooltip title={tl || `${value}`} arrow placement='top' {...restTooltipProps}>
            <span>{value}</span>
          </Tooltip> : null;
        }
        return params.value;
      };
    }
  }
  return { ...initInfo, ...restCol, ...(suffix || {}) } as GridColDef;
};

export const DataGridTable = (props: DataGridTableProps) => {
  const {
    columns: columnsProp, paginationProps, initialState, initialPageSize, components, componentsProps, paginationMode, autoHeight, getRowId,
    height, rowKey = 'id', rootProps, sx, autoRowHeight, getRowHeight, useDefaultPagination, sortable,
    ...restProps
  } = props;
  const { toolbar, pagination, ...restComponentsProps } = (componentsProps || {});
  const columns = useCreation(() => (columnsProp || []).map((item) => initColumn(item, typeof sortable === 'undefined' ? {} : { sortable: !!sortable })), [ columnsProp, sortable ]);
  return (
    <Box
      {...{
        ...(rootProps || {}),
        sx: height ? { ...(rootProps?.sx || {}), height } : rootProps?.sx,
      }}
    >
      <DataGrid
        columns={columns}
        getRowId={getRowId ?? ((row) => row[rowKey])}
        paginationMode={paginationMode ?? (typeof props.rowCount === 'undefined' ? 'client' : 'server')}
        autoHeight={height ? false : autoHeight}
        getRowHeight={(!autoRowHeight || typeof getRowHeight !== 'undefined') ? getRowHeight : () => 'auto'}
        components={useDefaultPagination ? {
          NoRowsOverlay,
          ...(components || {}),
        } : {
          Pagination: DataGridPagination,
          NoRowsOverlay,
          ...(components || {}),
        }}
        componentsProps={useDefaultPagination ? {
          toolbar: {
            csvOptions: {
              utf8WithBom: true,
            },
            printOptions: {
              disableToolbarButton: true, // 不显示打印按钮
            },
            ...(toolbar || {}),
          },
          ...restComponentsProps,
        } : {
          toolbar: {
            csvOptions: {
              utf8WithBom: true,
            },
            printOptions: {
              disableToolbarButton: true, // 不显示打印按钮
            },
            ...(toolbar || {}),
          },
          pagination: {
            ...(paginationProps || {}),
            rowsPerPageOptions: props.rowsPerPageOptions,
            onChange: props.onPageChange,
            onPageSizeChange: props.onPageSizeChange,
            ...(pagination || {}),
          },
          ...restComponentsProps,
        }}
        initialState={{
          ...(initialPageSize ? { pagination: { pageSize: initialPageSize } } : {}),
          ...(initialState || {}),
        }}
        sx={autoRowHeight ? {
          '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '4px' },
          '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '12px' },
          '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '20px' },
          ...(sx || {}),
        } : sx}
        {...restProps}
      />
    </Box>
  );
};

DataGridTable.defaultProps = {
  localeText: zhCN.components.MuiDataGrid.defaultProps.localeText,
  rowKey: 'id',
  rowsPerPageOptions: [ 10, 20, 50, 100 ],
  disableColumnFilter: true,
  disableColumnMenu: true,
  disableSelectionOnClick: true,
  autoHeight: true,
  initialPageSize: 10,
};

DataGridTable.displayName = 'iimm.Mui.DataGridTable';

/** 自定义的GridTableColumn条目类型 */
export interface DataGridTableColumn extends Omit<GridColDef, 'type'>, IStatusConvertRelateProps {
  type?: 'string' | 'number' | 'date' | 'dateTime' | 'boolean' | 'singleSelect' | 'actions' | 'status',
  title?: string,
  titleClassName?: GridColumnHeaderClassNamePropType,
  titleAlign?: GridAlignment,
  renderTitle?: (params: GridColumnHeaderParams) => React.ReactNode,
  /** 如果为真则提供tooltip包裹 */
  showTooltip?: boolean | ((params: Partial<GridValueGetterParams>) => boolean),
  tooltipProps?: TooltipProps,
}

export interface DataGridTableProps extends Omit<DataGridProps, 'columns'|'type'> {
  columns: DataGridTableColumn[],
  /** 初始化所有列的可排序性
   * @default undefined
   */
  sortable?: boolean,
  /**
   * field name of row's id
   * @default 'id'
   */
  rowKey?: string,
  /**
   * table's height only when autoHeight !== true
   */
  height?: number | string,
  initialPageSize?: number,
  paginationProps?: DataGridPaginationProps,
  rootProps?: BoxProps,

  /** getRowHeight : () => 'auto'的快捷props，并会自动添加行py
   * ```
  sx={autoRowHeight ? {
          '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '4px' },
          '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '12px' },
          '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '20px' },
          ...(sx || {}),
        } : sx}
   * ```
   */
  autoRowHeight?: boolean,
  /** 使用原始分页组件?
   * @default false
   */
  useDefaultPagination?: boolean,
}
