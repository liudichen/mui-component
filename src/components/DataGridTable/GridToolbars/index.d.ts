import React from 'react';
import { GridToolbar as MuiGridToolbar, GridToolbarExport } from '@mui/x-data-grid';

export interface GridToolbarFtyParams {
  showColumn?: boolean,
  showFilter?: boolean,
  showDensity?: boolean,
  showExport?: boolean,
  ExportRender?: React.FunctionComponent | React.Component | typeof GridToolbarExport,
}

/** 生成自定义GridToolbar的函数 */
export declare const GridToolbarFty: (params?: GridToolbarFtyParams) => typeof MuiGridToolbar;

/** 来自@mui/x-data-grid的原始GridToolbar */
export declare const GridToolbar: typeof MuiGridToolbar;

