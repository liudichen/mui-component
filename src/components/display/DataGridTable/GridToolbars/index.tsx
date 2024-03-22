// @ts-nocheck
import type { ComponentType } from "react";
import {
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

export interface GridToolbarFtyParams {
  showColumn?: boolean;
  showFilter?: boolean;
  showDensity?: boolean;
  showExport?: boolean;
  ExportRender?: ComponentType<any> | typeof GridToolbarExport;
}

const GridToolbarFty = (params?: GridToolbarFtyParams) => {
  const {
    showColumn = true,
    showFilter = true,
    showDensity = true,
    showExport = false,
    ExportRender = undefined,
  } = params || {};
  return (props: any) => {
    const { csvOptions, printOptions } = props;
    return (
      <GridToolbarContainer>
        {showColumn && <GridToolbarColumnsButton />}
        {showFilter && <GridToolbarFilterButton />}
        {showDensity && <GridToolbarDensitySelector />}
        {showExport &&
          (ExportRender ? (
            // @ts-ignore
            <ExportRender />
          ) : (
            <GridToolbarExport
              printOptions={{
                disableToolbarButton: true,
                ...(printOptions || {}),
              }}
              csvOptions={{
                utf8WithBom: true,
                ...(csvOptions || {}),
              }}
            />
          ))}
      </GridToolbarContainer>
    );
  };
};

/** 只显示列和间距的工具条GridToolbar */
const DefaultGridToolbar = GridToolbarFty();
const DefaultGridToolbarWithDownload = GridToolbarFty({ showColumn: true, showDensity: true, showExport: true });
export { GridToolbar, GridToolbarFty, DefaultGridToolbar, DefaultGridToolbarWithDownload };
