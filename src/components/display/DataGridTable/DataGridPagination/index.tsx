import React from 'react';
import { MenuItem, Pagination as MuiPagination, Select, Box, Stack } from '@mui/material';
import { useGridApiContext, useGridSelector, gridPageCountSelector, gridPageSizeSelector, gridPageSelector, gridRowCountSelector } from '@mui/x-data-grid';
import { useId } from '@iimm/react-shared';
import type { PaginationProps as MuiPaginationProps } from '@mui/material';

export interface DataGridPaginationProps extends Omit<MuiPaginationProps, 'onChange'> {
  rowsPerPageOptions?: number[],
  onPageSizeChange?: (pageSize: number, details?: object) => void,
  onChange?: (page: number) => void,
}

export const DataGridPagination = (props: DataGridPaginationProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { rowsPerPageOptions = [ 10, 20, 50, 100 ], page: pageProps, onPageSizeChange, onChange, count, ...restProps } = props;
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const total = useGridSelector(apiRef, gridRowCountSelector);
  const id = useId();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Stack
        direction={'row'}
      >
        共{total}行&nbsp;每页:&ensp;
        <Select
          id={id}
          variant='standard'
          autoWidth
          size='small'
          value={pageSize}
          onChange={(e) => {
            const ps = +(e.target.value) || (rowsPerPageOptions?.[0] || 10);
            apiRef.current.setPageSize(ps);
            onPageSizeChange?.(ps);
          }}
        >
          {rowsPerPageOptions.map((item) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <MuiPagination
        {...restProps}
        count={pageCount}
        page={page + 1}
        onChange={(e, value) => {
          apiRef.current.setPage(value - 1);
          onChange?.(value - 1);
        }}
      />
    </Box>
  );
};

DataGridPagination.defaultProps = {
  size: 'small',
  variant: 'outlined',
  color: 'secondary',
};

DataGridPagination.displayName = 'iimm.Mui.DataGridTable.DataGridPagination';

