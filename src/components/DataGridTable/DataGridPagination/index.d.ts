import React from 'react';
import { PaginationProps } from '@mui/material';

export interface DataGridPaginationProps extends PaginationProps {
  rowsPerPageOptions?: number[],
  onPageSizeChange?: (pageSize: number, details?: object) => void,
}

declare const DataGridPagination: React.FunctionComponent<DataGridPaginationProps>;

export default DataGridPagination;
