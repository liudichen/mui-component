/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-12 16:19:19
 * @LastEditTime: 2022-05-12 16:30:04
 */
import React from 'react';
import { GridToolbar as MuiGridToolbar, GridToolbarExport } from '@mui/x-data-grid';

interface GridToolbarFtyParams {
  showColumn?: boolean,
  showFilter?: boolean,
  showDensity?: boolean,
  showExport?: boolean,
  ExportRender?: React.FunctionComponent | React.Component | typeof GridToolbarExport,
}

declare const GridToolbarFty: (params?: GridToolbarFtyParams) => typeof MuiGridToolbar;
declare const GridToolbar: typeof MuiGridToolbar;

export default GridToolbarFty;

export {
  GridToolbar,
  GridToolbarFtyParams,
};
