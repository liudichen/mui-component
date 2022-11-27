import React from 'react';
import { useControllableValue, useCreation } from 'ahooks';
import { Box, Table, TableBody, TableFooter, TableHead } from '@mui/material';
import Pagination from '../Pagination';

import Row from './Row';

const SimpleTable = (props) => {
  const {
    tableContainerBoxProps,
    columns,
    rows,
    rowKey,
    total,
    current,
    pageSize,
    pageSizeOptions,
    onPageChange,
    onPageSizeChange,
    initPageSize,
    paginationProps,
    hideHeader,
    showFoot,
    footRender, footProps, hidePagination,
    title,
    titlePosition,
    titleStyle,
    bordered,
    hideFooter,
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
  const colSpans = useCreation(() => {
    let cols = columns?.length ?? 0;
    if (showExpandColumn) {
      cols += 1;
    }
    return cols;
  }, [ columns?.length, showExpandColumn ]);
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
          {showFoot && !!footRender && (
            <TableFooter {...(footProps || {})}>
              {footRender}
            </TableFooter>
          )}
        </Table>
      </Box>
      <Box>
        {(hidePagination === false ||
          (typeof hidePagination === 'undefined' &&
            (total ?? rows?.length ?? 0) > initPageSize &&
            (total ?? rows?.length ?? 0) > rowsPerPage)) && (
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

export default SimpleTable;
