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
