import { type ReactNode, type CSSProperties } from "react";
import { useControllableValue, useCreation } from "ahooks";
import { Box, Table, TableBody, TableCell, TableFooter, TableHead, TableRow } from "@mui/material";
import type { TableProps, BoxProps, TableFooterProps } from "@mui/material";

import { Pagination } from "../Pagination";
import { Row } from "./Row";
import type { PaginationProps } from "../Pagination";
import type { IStatusConvertRelateProps } from "../StatusRender";
import { NoData } from "../NoData";

const defaultPageSizes = [10, 25, 50, 100, 200];

export const SimpleTable = (props: SimpleTableProps) => {
  const {
    tableContainerBoxProps,
    columns,
    rows,
    rowKey,
    total,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    current,
    pageSize,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = defaultPageSizes,
    initPageSize = 10,
    paginationProps,
    hideHeader,
    showTableFooter,
    tableFooter,
    tableFooterProps,
    hidePagination: hidePaginationProp,
    autoHidePagination,
    title,
    titlePosition = "top",
    titleStyle,
    bordered,
    columnDefaultWidth = 100,
    expandable,
    showExpandColumn = true,
    expandIcon,
    expandRowByClick,
    expandColumnWidth = 45,
    expandRowRender,
    getRowExpandable,
    unmountOnExit,
    ...restProps
  } = props;
  const [pageNumber, setPageNumber] = useControllableValue(props, {
    valuePropName: "current",
    trigger: "onPageChange",
    defaultValue: 1,
  });
  const [rowsPerPage, setRowsPerPage] = useControllableValue(props, {
    defaultValuePropName: "initPageSize",
    valuePropName: "pageSize",
    trigger: "onPageSizeChange",
    defaultValue: 25,
  });
  const dataSource = useCreation(() => {
    if (total === undefined || total === rows?.length) {
      return rows?.slice(rowsPerPage * (pageNumber - 1), rowsPerPage * pageNumber) || [];
    }
    return rows || [];
  }, [rows, rowsPerPage, pageNumber, total]);
  const counts = total ?? rows?.length ?? 0;
  const hidePagination = useCreation(() => {
    if (typeof hidePaginationProp !== "undefined") return !!hidePaginationProp;
    if (autoHidePagination) {
      return !(counts > initPageSize && counts > rowsPerPage);
    }
    return false;
  }, [hidePaginationProp, autoHidePagination, counts, initPageSize, rowsPerPage]);
  return (
    <Box>
      <Box
        {...(tableContainerBoxProps || {})}
        sx={{
          width: "100%",
          px: 2,
          overflow: "auto",
          ...(tableContainerBoxProps?.sx || {}),
        }}
      >
        <Table {...restProps}>
          {!!title && (
            <caption
              style={{
                ...{
                  padding: 0,
                  captionSide: titlePosition,
                  ...(titleStyle || {}),
                },
              }}
            >
              {title}
            </caption>
          )}
          {!hideHeader && (
            <TableHead>
              <Row
                rowIndex={-1}
                columns={columns}
                expandable={expandable}
                showExpandColumn={showExpandColumn}
                expandColumnWidth={expandColumnWidth}
                bordered={bordered}
                columnDefaultWidth={columnDefaultWidth}
              />
            </TableHead>
          )}
          <TableBody>
            {dataSource?.length ? (
              dataSource.map((item, index) => {
                let isExpandable = true;
                if (typeof getRowExpandable === "function") {
                  isExpandable = getRowExpandable(item, index) ?? true;
                }
                return (
                  <Row
                    // @ts-ignore
                    key={item?.[rowKey] ?? index}
                    row={item}
                    rowIndex={index}
                    expandable={expandable}
                    isExpandable={expandable && isExpandable}
                    expandColumnWidth={expandColumnWidth}
                    expandIcon={expandIcon}
                    expandRowByClick={expandRowByClick}
                    expandRowRender={expandRowRender}
                    showExpandColumn={showExpandColumn}
                    bordered={bordered}
                    columns={columns}
                    hideHeader={hideHeader}
                    unmountOnExit={unmountOnExit}
                    columnDefaultWidth={columnDefaultWidth}
                  />
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={(columns?.length || 0) + (expandable && showExpandColumn ? 1 : 0)}>
                  <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <NoData />
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {showTableFooter && !!tableFooter && <TableFooter {...(tableFooterProps || {})}>{tableFooter}</TableFooter>}
        </Table>
      </Box>
      <Box>
        {!hidePagination && (
          <Pagination
            total={total ?? rows?.length ?? 0}
            current={pageNumber}
            onPageChange={setPageNumber}
            pageSize={rowsPerPage}
            onPageSizeChange={setRowsPerPage}
            color="secondary"
            pageSizeOptions={pageSizeOptions}
            siblingCount={1}
            {...(paginationProps || {})}
          />
        )}
      </Box>
    </Box>
  );
};

interface RowItem {
  [key: string]: any;
}

interface IGetterParams<R extends RowItem = any> {
  row?: R;
  rowIndex?: number;
  field?: string;
  value?: any;
}

interface ITitleRenderParams {
  field?: string;
}

export interface SimpleTableColumn<R extends RowItem = any> extends IStatusConvertRelateProps {
  statusDeleteLine?: boolean;
  field?: string;
  title?: ReactNode;
  renderTitle?: (parmas: ITitleRenderParams) => ReactNode;
  titleAlign?: "center" | "left" | "right";
  align?: "center" | "left" | "right";
  renderCell?: (params: IGetterParams<R>) => ReactNode;
  type?: "string" | "number" | "date" | "select" | "actions" | "status" | "dateTime" | "boolean";
  width?: number | string;
  maxWidth?: number | string;
  minWidth?: number | string;
  valueGetter?: (params: IGetterParams<R>) => any;
  getCellProps?: (params: IGetterParams<R>) => object;
  ellipsis?: boolean;
  showTooltip?: boolean | ((params: IGetterParams<R>) => boolean);
}

export interface SimpleTableProps<R extends RowItem = any> extends Omit<TableProps, "title"> {
  /** table外包裹的Box组件的props */
  tableContainerBoxProps?: BoxProps;
  /** 初始每页行数 */
  initPageSize?: number;
  rows?: R[];
  /** 行数据key的Id */
  rowKey?: string;
  columns?: SimpleTableColumn<R>[];
  /** 表格的caption标题内容 */
  title?: ReactNode;
  titleStyle?: CSSProperties;
  /** 表格标题caption的位置
   * @default 'top'
   */
  titlePosition?: "top" | "bottom" | "inherit";
  /** 隐藏表头? */
  hideHeader?: boolean;

  /** 显示表格框线? */
  bordered?: boolean;
  /** 设定表格列的默认宽度
   * @default 100
   */
  columnDefaultWidth?: number | string;

  /** 显示表格的TableFooter?
   * 需配合tableFooter使用
   * @default false
   */
  showTableFooter?: boolean;
  /** 表格TalbleFooter的props */
  tableFooterProps?: TableFooterProps;
  /** tableFoot的内容 */
  tableFooter?: ReactNode;
  /** 隐藏表格页码区域? */
  hidePagination?: boolean;
  /** 自动隐藏页码区域? */
  autoHidePagination?: boolean;
  /** 总行数 */
  total?: number;
  /** 当前页码 */
  current?: number;
  /** 每页行数 */
  pageSize?: number;
  /** 每页行数大小选项列表 */
  pageSizeOptions?: number[];
  onPageChange?: (current: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  /** 传递给Pagination组件的props
   * @default { siblingCount: 1 }
   */
  paginationProps?: Omit<
    PaginationProps,
    "total" | "current" | "onPageChange" | "onPageSizeChange" | "pageSizeOptions"
  >;

  /** 可展开行? */
  expandable?: boolean;
  /** 显示展开行的按钮列?
   * @default true
   */
  showExpandColumn?: boolean;
  /** 展开行的按钮 */
  expandIcon?: [ReactNode, ReactNode];
  /** 可通过点击行的内容展开行?
   * @default false
   */
  expandRowByClick?: boolean;
  /** 展开按钮列的宽度
   * @default 45
   */
  expandColumnWidth?: number | string;
  expandRowRender?: (row: R, index?: number, open?: boolean) => ReactNode;
  getRowExpandable?: (row: R, index?: number) => boolean;
  /** 展开行内容关闭时卸载组件?
   * @default false
   */
  unmountOnExit?: boolean;
}
