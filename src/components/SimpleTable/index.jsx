import React from 'react';
import { useControllableValue, useCreation } from 'ahooks';
import { Box, Table, TableBody, TableFooter, TableHead } from '@mui/material';

import { Pagination } from '../Pagination';
import { Row } from './Row';

export const SimpleTable = (props) => {
  const {
    tableContainerBoxProps,
    columns,
    rows,
    rowKey,
    total,
    // eslint-disable-next-line no-unused-vars
    current, pageSize, onPageChange, onPageSizeChange,
    pageSizeOptions,
    initPageSize,
    paginationProps,
    hideHeader,
    showTableFooter,
    tableFooter, tableFooterProps, hidePagination: hidePaginationProp, autoHidePagination,
    title,
    titlePosition,
    titleStyle,
    bordered,
    columnDefaultWidth,
    expandable,
    showExpandColumn,
    expandIcon,
    expandRowByClick,
    expandColumnWidth,
    expandRowRender,
    getRowExpandable,
    unmountOnExit,
    ...restProps
  } = props;
  const [ pageNumber, setPageNumber ] = useControllableValue(props, {
    valuePropName: 'current',
    trigger: 'onPageChange',
    defaultValue: 1,
  });
  const [ rowsPerPage, setRowsPerPage ] = useControllableValue(props, {
    defaultValuePropName: 'initPageSize',
    valuePropName: 'pageSize',
    trigger: 'onPageSizeChange',
    defaultValue: 25,
  });
  const dataSource = useCreation(() => {
    if (total === undefined || total === rows?.length) {
      return (
        rows?.slice(rowsPerPage * (pageNumber - 1), rowsPerPage * pageNumber) ||
        []
      );
    }
    return rows || [];
  }, [ rows, rowsPerPage, pageNumber, total ]);
  const counts = total ?? rows?.length ?? 0;
  const hidePagination = useCreation(() => {
    if (typeof hidePaginationProp !== 'undefined') return !!hidePaginationProp;
    if (autoHidePagination) {
      return !(counts > initPageSize && counts > rowsPerPage);
    }
    return false;
  }, [ hidePaginationProp, autoHidePagination, counts, initPageSize, rowsPerPage ]);
  return (
    <Box>
      <Box
        {...(tableContainerBoxProps || {})}
        sx={{
          width: '100%',
          px: 2,
          overflow: 'auto',
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
            {dataSource?.map((item, index) => {
              let isExpandable = true;
              if (typeof getRowExpandable === 'function') {
                isExpandable = getRowExpandable(item, index) ?? true;
              }
              return (
                <Row
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
            })}
          </TableBody>
          {showTableFooter && !!tableFooter && (
            <TableFooter {...(tableFooterProps || {})}>
              {tableFooter}
            </TableFooter>
          )}
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
            color='secondary'
            pageSizeOptions={pageSizeOptions}
            {...(paginationProps || {})}
          />
        )}
      </Box>
    </Box>
  );
};

SimpleTable.defaultProps = {
  titlePosition: 'top',
  initPageSize: 10,
  pageSizeOptions: [ 10, 25, 50, 100, 200 ],
  showExpandColumn: true,
  expandColumnWidth: 45,
  columnDefaultWidth: 100,
};

SimpleTable.displayName = 'iimm.Mui.SimpleTable';
