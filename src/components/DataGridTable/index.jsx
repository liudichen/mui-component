/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 15:46:09
 * @LastEditTime: 2022-05-24 09:11:56
 */
import PropTypes from 'prop-types';
import React from 'react';
import { useCreation } from 'ahooks';
import { Box, Tooltip } from '@mui/material';
import { DataGrid, zhCN } from '@mui/x-data-grid';

import NoRowsOverlay from './NoRowsOverlay';
import DataGridPagination from './DataGridPagination';
import { paginationPropTypes, dataGridPropTypes } from '../../propTypes';
import StatusRender from '../StatusRender';

export const initColumn = (col, prefix = { align: 'center', headerAlign: 'center' }, suffix = {}) => {
  const { titleAlign, title, titleClassName, renderTitle, type, statusColorConvert, statusTypeConvert, statusTextConvert, statusConvert, showTooltip, tooltipProps, ...restCol } = col;
  const initInfo = {
    ...(prefix || {}),
  };
  if (type) {
    if (type !== 'status') {
      initInfo.type = type;
    } else {
      initInfo.renderCell = ({ value }) => (
        <StatusRender
          status={value}
          statusColorConvert={statusColorConvert}
          statusTextConvert={statusTextConvert}
          statusTypeConvert={statusTypeConvert}
          statusConvert={statusConvert}
        />
      );
    }
  }
  if (titleAlign) { initInfo.headerAlign = titleAlign; }
  if (title) { initInfo.headerName = title; }
  if (titleClassName) { initInfo.headerName = titleClassName; }
  if (renderTitle) { initInfo.renderHeader = renderTitle; }
  if (showTooltip) {
    initInfo.renderCell = ({ value }) => (
      (value !== null && value !== undefined) ? <Tooltip title={value} arrow placement='top' {...(tooltipProps || {})}>
        <span>{value}</span>
      </Tooltip> : null
    );
  }
  return { ...initInfo, ...restCol, ...(suffix || {}) };
};

const DataGridTable = (props) => {
  const {
    columns: columnsProp, paginationProps, initialState, initialPageSize, components, componentsProps, paginationMode, autoHeight, getRowId,
    height, rowKey, rootProps,
    ...restProps
  } = props;
  const { toolbar, pagination, ...restComponentsProps } = (componentsProps || {});
  const columns = useCreation(() => (columnsProp || []).map((item) => initColumn(item)), [ columnsProp ]);
  return (
    <Box
      {...{
        ...(rootProps || {}),
        sx: height ? { ...(rootProps?.sx || {}), height } : rootProps?.sx,
      }}
    >
      <DataGrid
        columns={columns}
        getRowId={getRowId ?? ((row) => row[rowKey]) }
        paginationMode={paginationMode ?? (typeof props.rowCount === 'undefined' ? 'client' : 'server')}
        autoHeight={height ? false : autoHeight}
        components={{
          Pagination: DataGridPagination,
          NoRowsOverlay,
          ...(components || {}),
        }}
        componentsProps={{
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

DataGridTable.propTypes = {
  initialPageSize: PropTypes.number,
  height: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
  paginationProps: PropTypes.shape(paginationPropTypes),
  rootProps: PropTypes.object,
  rowKey: PropTypes.string,

  ...dataGridPropTypes,
};

export default DataGridTable;
