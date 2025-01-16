import { useMemoizedFn } from "ahooks";
import {
  MenuItem,
  Pagination as MuiPagination,
  type PaginationProps as MuiPaginationProps,
  Select,
  Box,
  Stack,
} from "@mui/material";
import {
  useGridApiContext,
  useGridSelector,
  gridPageCountSelector,
  gridPageSizeSelector,
  gridPageSelector,
  gridRowCountSelector,
} from "@mui/x-data-grid";
import { useId } from "@iimm/react-shared";

import { JumpTo } from "./JumpTo";

export interface DataGridPaginationProps extends Omit<MuiPaginationProps, "onChange"> {
  rowsPerPageOptions?: number[];
  onPageSizeChange?: (pageSize: number, details?: object) => void;
  onChange?: (page: number) => void;
  showJumpTo?: boolean;
}

export const DataGridPagination = (props: DataGridPaginationProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    rowsPerPageOptions = [10, 20, 50, 100],
    page: pageProps,
    onPageSizeChange,
    onChange,
    count,
    showJumpTo,
    ...restProps
  } = props;
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const total = useGridSelector(apiRef, gridRowCountSelector);
  const id = useId();

  const onChangeInner = useMemoizedFn((e, value) => {
    apiRef.current.setPage(value - 1);
    onChange?.(value - 1);
  });
  const onSelectChange = useMemoizedFn((e) => {
    const ps = +e.target.value || rowsPerPageOptions?.[0] || 10;
    apiRef.current.setPageSize(ps);
    onPageSizeChange?.(ps);
  });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Stack direction={"row"}>
        共{total}行&nbsp;每页:&ensp;
        <Select id={id} variant="standard" autoWidth size="small" value={pageSize} onChange={onSelectChange}>
          {rowsPerPageOptions.map((item) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      {Boolean(showJumpTo || (pageCount > 9 && showJumpTo !== false)) && (
        <JumpTo total={pageCount} onPageChange={onChangeInner} color={restProps.color} size={restProps.size} />
      )}
      <MuiPagination
        size="small"
        variant="outlined"
        color="secondary"
        {...restProps}
        count={pageCount}
        page={page + 1}
        onChange={onChangeInner}
      />
    </Box>
  );
};
