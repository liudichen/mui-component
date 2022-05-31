/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-30 11:22:55
 * @LastEditTime: 2022-05-31 09:01:42
 */
import PropTypes from 'prop-types';
import React from 'react';
import { useControllableValue, useCreation } from 'ahooks';
import { Box, Table, TableBody, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';

import { columnPropType } from './common';
import Row from './Row';

const SimpleTable = (props) => {
  const {
    tableContainerBoxProps,
    columns, rows, rowKey,
    // eslint-disable-next-line no-unused-vars
    total, current, pageSize, pageSizeOptions, onPageChange, onPageSizeChange, paginationProps, initPageSize,
    hideHeader, title, titlePosition, titleStyle, bordered, hideFooter,
    expandable, showExpandColumn, expandIcon, expandRowByClick, expandColumnWidth, expandRowRender, getRowExpandable, unmountOnExit,
    ...restProps
  } = props;
  const colSpans = useCreation(() => {
    let cols = columns?.length ?? 0;
    if (showExpandColumn) { cols += 1; }
    return cols;
  }, [ columns?.length, showExpandColumn ]);
  const [ pageNumber, setPageNumber ] = useControllableValue(props, { valuePropName: 'current', trigger: 'onPageChange', defaultValue: 1 });
  const [ rowsPerPage, setRowsPerPage ] = useControllableValue(props, { defaultValuePropName: 'initPageSize', valuePropName: 'pageSize', trigger: 'onPageSizeChange', defaultValue: 25 });
  const dataSource = (typeof total !== 'undefined' || !rowsPerPage) ? rows : rows?.slice(rowsPerPage * (pageNumber - 1), rowsPerPage * pageNumber);
  return (
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
            style={{ ...{
              padding: 0,
              captionSide: titlePosition,
              ...(titleStyle || {}),
            } }}
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
            />
          </TableHead>
        )}
        <TableBody>
          { dataSource?.map((item, index) => {
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
              />
            );
          })
          }
        </TableBody>
        { !hideFooter && (
          <TableFooter>
            <TableRow>
              <TablePagination
                labelRowsPerPage='每页行数:'
                showFirstButton
                showLastButton
                {...(paginationProps || {})}
                colSpan={colSpans}
                count={total ?? rows?.length ?? 0}
                page={pageNumber - 1}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={pageSizeOptions}
                onPageChange={(e, v) => setPageNumber(v + 1)}
                onRowsPerPageChange={(e) => setRowsPerPage(e.target.value)}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </Box>
  );
};

SimpleTable.defaultProps = {
  titlePosition: 'top',
  initPageSize: 10,
  pageSizeOptions: [ 10, 25, 50, 100, 200 ],
  showExpandColumn: true,
  expandColumnWidth: 45,
};

SimpleTable.propTypes = {
  component: PropTypes.elementType,
  classes: PropTypes.object,
  padding: PropTypes.oneOf([ 'normal', 'checkbox', 'none' ]),
  size: PropTypes.oneOfType([
    PropTypes.oneOf([ 'medium', 'small' ]),
    PropTypes.string,
  ]),
  stickyHeader: PropTypes.bool,
  sx: PropTypes.oneOfType([ PropTypes.array, PropTypes.func, PropTypes.object ]),

  tableContainerBoxProps: PropTypes.object,
  rows: PropTypes.array,
  rowKey: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.shape(columnPropType)),
  hideHeader: PropTypes.bool,
  title: PropTypes.node,
  titlePosition: PropTypes.oneOf([ 'top', 'bottom', 'inherit' ]),

  bordered: PropTypes.bool,

  expandable: PropTypes.bool,
  showExpandColumn: PropTypes.bool,
  expandIcon: PropTypes.array,
  expandRowByClick: PropTypes.bool,
  expandColumnWidth: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  expandRowRender: PropTypes.func, // (row,index,open)=>ReactNode
  getRowExpandable: PropTypes.func, // (row,index) => boolean
  unmountOnExit: PropTypes.bool,

  hideFooter: PropTypes.bool,
  total: PropTypes.number,
  current: PropTypes.number,
  pageSize: PropTypes.number,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  paginationProps: PropTypes.object,
};

export default SimpleTable;
