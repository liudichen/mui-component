/*
 * @Description: 生成GridToolbar的工厂函数
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-12 15:56:38
 * @LastEditTime: 2022-05-12 16:31:30
 */
import React from 'react';
import { GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';

const GridToolbarFty = ({
  showColumn = true,
  showFilter = true,
  showDensity = true,
  showExport = false,
  ExportRender = undefined,
}) => {
  return React.forwardRef((props = {}, ref) => (
    <GridToolbarContainer ref={ref} {...props || {}}>
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
  ));
};

export default GridToolbarFty;

export {
  GridToolbar,
};
