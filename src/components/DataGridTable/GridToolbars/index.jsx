/*
 * @Description: 生成GridToolbar的工厂函数
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-12 15:56:38
 * @LastEditTime: 2022-05-12 16:39:32
 */
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

export default GridToolbarFty;

export {
  GridToolbar,
};
