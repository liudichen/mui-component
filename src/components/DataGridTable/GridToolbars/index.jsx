import React from 'react';
import { GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';

const GridToolbarFty = (params) => {
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
          <ExportRender />
        ) : <GridToolbarExport />
      )}
    </GridToolbarContainer>
  );
};

export {
  GridToolbar,
  GridToolbarFty,
};
