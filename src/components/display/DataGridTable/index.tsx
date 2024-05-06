/* eslint-disable  */
import React, { ReactNode } from "react";
import { useCreation } from "ahooks";
import { Box, Tooltip } from "@mui/material";
import type { BoxProps, TooltipProps } from "@mui/material";
import { DataGrid, zhCN } from "@mui/x-data-grid";
import type {
  GridAlignment,
  GridActionsColDef,
  GridColDef,
  GridColumnHeaderClassNamePropType,
  GridColumnHeaderParams,
  DataGridProps,
  GridValueGetterParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import dayjs from "dayjs";

import { NoData as NoRowsOverlay } from "../NoData";
import { DataGridPagination } from "./DataGridPagination";
import { StatusRender } from "../StatusRender";
import type { DataGridPaginationProps } from "./DataGridPagination";
import type { shownType } from "../StatusRender";

const statusRelateFnConvert = (fn: Function, row: any) => (fn ? (status?: string) => fn(status, row) : undefined);

export const initColumn = (
  col: DataGridTableColumn,
  prefix: Partial<DataGridTableColumn> = {},
  suffix: Partial<DataGridTableColumn> = {}
) => {
  const {
    titleAlign,
    title,
    titleClassName,
    renderTitle,
    type,
    statusColorConvert,
    statusTypeConvert,
    statusTextConvert,
    statusConvert,
    showTooltip,
    tooltipProps,
    statusDeleteLine,
    ...restCol
  } = col;
  const initInfo = {
    align: "center",
    headerAlign: "center",
    ...(prefix || {}),
  };
  if (type) {
    if (!["status", "date", "dateTime"].includes(type)) {
      initInfo.type = type;
    } else if (type === "status") {
      initInfo.renderCell = ({ value, row }) => (
        <StatusRender
          status={value}
          statusColorConvert={statusRelateFnConvert(statusColorConvert, row)}
          statusTextConvert={statusRelateFnConvert(statusTextConvert, row)}
          statusTypeConvert={statusRelateFnConvert(statusTypeConvert, row)}
          statusConvert={statusRelateFnConvert(statusConvert, row)}
          deleteLine={statusDeleteLine}
        />
      );
      if (typeof initInfo.width === "undefined") {
        initInfo.width = 70;
      }
    } else {
      initInfo.type = type;
      initInfo.width = type === "date" ? 100 : 160;
      initInfo.valueGetter = ({ value }) =>
        value ? dayjs(value).format(type === "date" ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss") : null;
    }
  }
  if (titleAlign) {
    initInfo.headerAlign = titleAlign;
  }
  if (title) {
    initInfo.headerName = title;
  }
  if (titleClassName) {
    initInfo.headerClassName = titleClassName;
  }
  if (renderTitle) {
    initInfo.renderHeader = renderTitle;
  }
  if (showTooltip) {
    if (showTooltip === true) {
      const { title: tl, ...restTooltipProps } = tooltipProps || {};
      initInfo.renderCell = ({ value }: GridRenderCellParams<number | string>) =>
        value ? (
          <Tooltip title={tl || value} arrow placement="top" {...restTooltipProps}>
            <span>{value}</span>
          </Tooltip>
        ) : null;
    } else if (typeof showTooltip === "function") {
      initInfo.renderCell = (params: GridRenderCellParams<number | string>) => {
        if (showTooltip(params)) {
          const { value } = params;
          const { title: tl, ...restTooltipProps } = tooltipProps || {};
          return value !== null && value !== undefined ? (
            <Tooltip title={tl || `${value}`} arrow placement="top" {...restTooltipProps}>
              <span>{value}</span>
            </Tooltip>
          ) : null;
        }
        return params.value;
      };
    }
  }
  return { ...initInfo, ...restCol, ...(suffix || {}) } as GridColDef;
};

const defaultPageSizes = [10, 20, 50, 100];

export const DataGridTable: React.FC<DataGridTableProps> = (props: DataGridTableProps) => {
  const {
    columns: columnsProp,
    paginationProps,
    initialState,
    rowsPerPageOptions = defaultPageSizes,
    initialPageSize = 10,
    components,
    componentsProps,
    paginationMode,
    autoHeight = true,
    getRowId,
    height,
    rowKey = "id",
    rootProps,
    sx,
    autoRowHeight,
    getRowHeight,
    useDefaultPagination,
    sortable,
    ...restProps
  } = props;
  const { toolbar, pagination, ...restComponentsProps } = componentsProps || {};
  const columns = useCreation(
    () =>
      (columnsProp || []).map((item) =>
        initColumn(item, typeof sortable === "undefined" ? {} : { sortable: !!sortable })
      ),
    [columnsProp, sortable]
  );
  return (
    <Box
      {...{
        ...(rootProps || {}),
        sx: height ? { ...(rootProps?.sx || {}), height } : rootProps?.sx,
      }}
    >
      <DataGrid
        localeText={zhCN.components.MuiDataGrid.defaultProps.localeText}
        disableColumnFilter
        disableColumnMenu
        disableSelectionOnClick
        rowsPerPageOptions={rowsPerPageOptions}
        columns={columns}
        getRowId={getRowId ?? ((row) => row[rowKey])}
        paginationMode={paginationMode ?? (typeof props.rowCount === "undefined" ? "client" : "server")}
        autoHeight={height ? false : autoHeight}
        getRowHeight={!autoRowHeight || typeof getRowHeight !== "undefined" ? getRowHeight : () => "auto"}
        components={
          useDefaultPagination
            ? {
                NoRowsOverlay,
                ...(components || {}),
              }
            : {
                Pagination: DataGridPagination,
                NoRowsOverlay,
                ...(components || {}),
              }
        }
        componentsProps={
          useDefaultPagination
            ? {
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
              }
            : {
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
                  rowsPerPageOptions,
                  onChange: props.onPageChange,
                  onPageSizeChange: props.onPageSizeChange,
                  ...(pagination || {}),
                },
                ...restComponentsProps,
              }
        }
        initialState={{
          ...(initialPageSize ? { pagination: { pageSize: initialPageSize } } : {}),
          ...(initialState || {}),
        }}
        sx={
          autoRowHeight
            ? {
                "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": { py: "4px" },
                "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": { py: "12px" },
                "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": { py: "20px" },
                ...(sx || {}),
              }
            : sx
        }
        {...restProps}
      />
    </Box>
  );
};

interface StatusConvertRelateProps<Row extends object> {
  /** 指定状态颜色 */
  statusColorConvert?: (status?: string, row?: Row) => string;
  /** 指定状态-> success等显示态的对应关系 */
  statusTypeConvert?: (status?: string, row?: Row) => shownType;
  /** 指定状态对应的显示文本 */
  statusTextConvert?: (status?: string, row?: Row) => ReactNode;
  /** 状态转换（原始状态转化为内置的状态） */
  statusConvert?: (status?: string, row?: Row) => string;
}

/** 自定义的GridTableColumn条目类型 */
export interface DataGridTableColumn<Row extends object = any>
  extends Partial<Omit<GridActionsColDef<Row>, "type">>,
    StatusConvertRelateProps<Row> {
  /**type=status时删除线? */
  statusDeleteLine?: boolean;
  type?: "string" | "number" | "date" | "dateTime" | "boolean" | "singleSelect" | "actions" | "status";
  title?: string;
  titleClassName?: GridColumnHeaderClassNamePropType;
  titleAlign?: GridAlignment;
  renderTitle?: (params: GridColumnHeaderParams) => React.ReactNode;
  /** 如果为真则提供tooltip包裹 */
  showTooltip?: boolean | ((params: Partial<GridValueGetterParams>) => boolean);
  tooltipProps?: TooltipProps;
}

export interface DataGridTableProps<Row extends object = any> extends Omit<DataGridProps<Row>, "columns" | "type"> {
  columns: DataGridTableColumn<Row>[];
  /** 初始化所有列的可排序性
   * @default undefined
   */
  sortable?: boolean;
  /**
   * field name of row's id
   * @default 'id'
   */
  rowKey?: string;
  /**
   * table's height only when autoHeight !== true
   */
  height?: number | string;
  initialPageSize?: number;
  paginationProps?: DataGridPaginationProps;
  rootProps?: BoxProps;

  /** getRowHeight : () => 'auto'的快捷props，并会自动添加行py
   * ```
  sx={autoRowHeight ? {
          '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '4px' },
          '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '12px' },
          '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '20px' },
          ...(sx || {}),
        } : sx}
   * ```
   */
  autoRowHeight?: boolean;
  /** 使用原始分页组件?
   * @default false
   */
  useDefaultPagination?: boolean;
}
