import React from 'react';
import { GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';

export interface GridToolbarFtyParams {
  showColumn?: boolean,
  showFilter?: boolean,
  showDensity?: boolean,
  showExport?: boolean,
  ExportRender?: React.FunctionComponent | React.Component | typeof GridToolbarExport,
}

const GridToolbarFty = (params?: GridToolbarFtyParams) => {
  const {
    showColumn = true,
    showFilter = true,
    showDensity = true,
    showExport = false,
    ExportRender = undefined,
  } = (params || {});
  return () => (
    <GridToolbarContainer >
      { showColumn && (
        <GridToolbarColumnsButton />
      )}
      { showFilter && (
        <GridToolbarFilterButton />
      )}
      { showDensity && (
        <GridToolbarDensitySelector />
      )}
      { showExport && (
        ExportRender ? (
          // @ts-ignore
          <ExportRender />
        ) : <GridToolbarExport />
      )}
    </GridToolbarContainer>
  );
};

/** 只显示列和间距的工具条GridToolbar */
const DefaultGridToolbar = GridToolbarFty();
export {
  GridToolbar,
  GridToolbarFty,
  DefaultGridToolbar,
};
