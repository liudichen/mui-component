import React from 'react';
import { useCreation } from 'ahooks';
import { Box, Tooltip } from '@mui/material';
import { DataGrid, zhCN } from '@mui/x-data-grid';
import dayjs from 'dayjs';

import { NoData as NoRowsOverlay } from '../NoData';
import DataGridPagination from './DataGridPagination';
import { StatusRender } from '../StatusRender';

export const initColumn = (col, prefix = {}, suffix = {}) => {
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
      initInfo.renderCell = ({ value }) => (
        (value !== null && value !== undefined) ? <Tooltip title={value} arrow placement='top' {...(tooltipProps || {})}>
          <span>{value}</span>
        </Tooltip> : null
      );
    } else if (typeof showTooltip === 'function') {
      initInfo.renderCell = (params) => {
        if (showTooltip(params)) {
          const { value } = params;
          return (value !== null && value !== undefined) ? <Tooltip title={`${value}`} arrow placement='top' {...(tooltipProps || {})}>
            <span>{value}</span>
          </Tooltip> : null;
        }
        return params.value;
      };
    }
  }
  return { ...initInfo, ...restCol, ...(suffix || {}) };
};

export const DataGridTable = (props) => {
  const {
    columns: columnsProp, paginationProps, initialState, initialPageSize, components, componentsProps, paginationMode, autoHeight, getRowId,
    height, rowKey, rootProps, sx, autoRowHeight, getRowHeight, useDefaultPagination, sortable,
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
