/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-30 14:55:53
 * @LastEditTime: 2022-06-16 11:40:09
 */
import PropTypes from 'prop-types';
import React from 'react';
import { useCreation, useMemoizedFn } from 'ahooks';
import { TableCell, Tooltip } from '@mui/material';
import { StatusRender } from 'mui-component';
import dayjs from 'dayjs';

import { columnPropType } from '../../common';

const Cell = (props) => {
  const { field, title, titleAlign, align, ellipsis, width, maxWidth, minWidth, type, renderCell, renderTitle, valueGetter, expandRowByClick, setOpen, row, rowIndex, bordered, getCellProps, showTooltip, hideHeader, columnDefaultWidth } = props;
  const cellSx = useCreation(() => {
    const sx = { px: 0, tableLayout: 'fixed' };
    if (rowIndex === -1 || (rowIndex === 0 && hideHeader)) {
      if (width) {
        sx.width = width;
      } else if (type === 'status' || type === 'date') {
        sx.width = 70;
      } else if (type === 'dateTime') {
        sx.width = 138;
      } else {
        sx.width = columnDefaultWidth;
      }
      if (maxWidth) { sx.maxWidth = maxWidth; }
      if (minWidth) { sx.minWidth = minWidth; }
      if (!minWidth && sx.width) {
        sx.minWidth = sx.width;
      }
    }
    if ((hideHeader && rowIndex > 0) || (!hideHeader && rowIndex > -1)) {
      if (ellipsis) {
        sx.textOverflow = 'ellipsis';
        sx.overflow = 'hidden';
        sx.whiteSpace = 'nowrap';
        if (!sx.maxWidth) {
          sx.maxWidth = sx.width ?? '100px';
        }
      } else {
        sx.wordBreak = 'break-all';
        sx.whiteSpace = 'normal';
      }
    }
    if (bordered) {
      sx.borderRight = '1px solid rgba(224,224,224,1)';
      sx.borderLeft = '1px solid rgba(224,224,224,1)';
      if (rowIndex === -1) {
        sx.borderTop = '1px solid rgba(224,224,224,1)';
      }
    }
    return sx;
  }, [ width, rowIndex, maxWidth, minWidth, ellipsis, bordered, type, hideHeader, columnDefaultWidth ]);
  const value = rowIndex === -1 ? '' : (valueGetter?.({ row, rowIndex, field, value: row?.[field] }) ?? row?.[field] ?? '');
  const cellProps = getCellProps?.({ row, rowIndex, field, value }) ?? {};
  const item = rowIndex === -1 ? (renderTitle?.({ field }) ?? title ?? field ?? '') : (renderCell?.({ row, rowIndex, field, value }) ?? (type === 'status' ? (
    <StatusRender
      status={value}
    />
  ) : (type === 'date' || type === 'dateTime') ? (value ? dayjs(value).format(type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss') : '-') : value));
  const onClick = useMemoizedFn(async () => {
    if (expandRowByClick && rowIndex > -1 && type !== 'actions') {
      setOpen?.((s) => !s);
    }
  });
  return (
    <TableCell
      align={rowIndex === -1 ? (titleAlign ?? 'center') : (align ?? 'center')}
      width={width}
      {...cellProps}
      sx={{ ...cellSx, ...(cellProps?.sx || {}) }}
    >
      { showTooltip ? (
        <Tooltip title={value} arrow placement='top'>
          <span
            onClick={onClick}
          >
            {item}
          </span>
        </Tooltip>
      ) : (
        <span
          onClick={onClick}
        >
          {item}
        </span>
      )}
    </TableCell>
  );
};

Cell.propTypes = {
  ...columnPropType,
  expandRowByClick: PropTypes.bool,
  setOpen: PropTypes.func,
  rowIndex: PropTypes.number,
  bordered: PropTypes.bool,
  row: PropTypes.object,
  expandIcon: PropTypes.array,
  hideHeader: PropTypes.bool,
  columnDefaultWidth: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
};

export default Cell;
