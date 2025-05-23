import { useControllableValue, useCreation, useMemoizedFn, useUpdateEffect } from "ahooks";
import { Pagination as MuiPagination, Box, Stack, Select, MenuItem, Typography } from "@mui/material";
import type { BoxProps, StackProps, SelectProps, PaginationProps as MuiPaginationProps } from "@mui/material";

import { JumpTo } from "./JumpTo";

const defaultPageSizes = [10, 25, 50, 100, 200];

export const Pagination = (props: PaginationProps) => {
  const {
    paginationBoxProps,
    paginationStackProps,
    showPageSize = true,
    pageSizeOptions = defaultPageSizes,
    pageSizeSelectProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    page,
    count,
    onChange,
    onPageChange: onPageChangeProp,
    onPageSizeChange: onPageSizeChangeProp,
    pageSize: pageSizeProp,
    total: totalProp,
    showItemRange = true,
    showJumpTo,
    ...restProps
  } = props;
  const [current, onPageChange] = useControllableValue(props, {
    valuePropName: "current",
    trigger: "onPageChange",
    defaultValue: 1,
    defaultValuePropName: "defaultPage",
  });
  const [pageSize, onPageSizeChange] = useControllableValue(props, {
    valuePropName: "pageSize",
    trigger: "onPageSizeChange",
    defaultValuePropName: "defaultPageSize",
    defaultValue: pageSizeOptions[0],
  });
  // 这里 total是指总页数，而totalProp是指总条目数
  const total = useCreation(() => Math.ceil((totalProp || 0) / (pageSize || 1)), [totalProp, pageSize]);

  const resetPageSize = useMemoizedFn(() => {
    if ((current - 1) * pageSize >= total) {
      onPageChange(1);
    }
  });

  useUpdateEffect(() => {
    resetPageSize();
  }, [total]);

  return (
    <Box marginTop={1} marginLeft={0.5} {...(paginationBoxProps || {})}>
      <Stack direction="row" alignItems="center" spacing={0.5} {...(paginationStackProps || {})}>
        {showItemRange && typeof totalProp !== "undefined" && (
          <Typography variant="h5">
            第{totalProp ? `${(current - 1) * pageSize + 1}-${Math.min(totalProp, current * pageSize)}` : "0"}项/共
            {totalProp}项&ensp;
          </Typography>
        )}
        {showPageSize && (
          <Select
            size="small"
            variant="standard"
            value={pageSize}
            onChange={(e) => onPageSizeChange(+(e?.target?.value as "string" | "number") || pageSizeOptions[0])}
            {...(pageSizeSelectProps || {})}
          >
            {pageSizeOptions.map((item) => (
              <MenuItem value={item} key={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        )}
        {Boolean(showJumpTo || (total > 9 && showJumpTo !== false)) && (
          <JumpTo total={total} size={restProps.size} color={restProps.color} onPageChange={onPageChange} />
        )}
        <MuiPagination
          page={current}
          count={total}
          onChange={(e, p) => onPageChange(p)}
          siblingCount={1}
          size="small"
          boundaryCount={1}
          hideNextButton
          hidePrevButton
          variant="outlined"
          {...restProps}
        />
      </Stack>
    </Box>
  );
};

export interface PaginationProps extends Partial<MuiPaginationProps> {
  /** 包裹在外部的Box的props
   * @default {marginLeft:0.5,marginTop:1}
   */
  paginationBoxProps?: BoxProps;
  /** 包裹在次外层的Stack的Props
   * @default {direction:'row',alignItems:'center',spacing:0.5}
   */
  paginationStackProps?: StackProps;
  /** 选择每页行数的Select组件的Props */
  pageSizeSelectProps?: Omit<Omit<SelectProps, "value">, "onChange">;
  current?: number;
  total?: number;
  pageSize?: number;
  defaultPageSize?: number;
  /** 显示选择每页多少行的选择框 */
  showPageSize?: boolean;
  showItemRange?: boolean;
  onPageChange?: (current: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  /** 每页行数选项
   * @default [ 10, 25, 50, 100, 200 ]
   */
  pageSizeOptions?: number[];
  showJumpTo?: boolean;
}
