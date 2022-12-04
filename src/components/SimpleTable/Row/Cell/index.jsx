import React from 'react';
import { useCreation, useMemoizedFn } from 'ahooks';
import { TableCell, Tooltip } from '@mui/material';
import { IconCheck, IconX } from '@tabler/icons';
import dayjs from 'dayjs';

import { StatusRender } from '../../../StatusRender';

export const Cell = (props) => {
  const { field, title, titleAlign, align, ellipsis, width, maxWidth, minWidth, type, renderCell, renderTitle, valueGetter, expandRowByClick, setOpen, row, rowIndex, bordered, getCellProps, showTooltip, hideHeader, columnDefaultWidth } = props;
  const cellSx = useCreation(() => {
    const sx = { px: 0, tableLayout: 'fixed' };
    if (rowIndex === -1 || (rowIndex === 0 && hideHeader)) {
      if (width) {
        sx.width = width;
      } else if (type === 'status' || type === 'date') {
        sx.width = 70;
      } else if (type === 'dateTime') {
        sx.width = 140;
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
  ) : (type === 'date' || type === 'dateTime') ? (value ? dayjs(value).format(type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss') : '-') : type === 'boolean' ? (
    value ? <IconCheck size='1.5em'/> : <IconX size='1.5em'/>
  ) : value));
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
      { (showTooltip && (typeof showTooltip === 'boolean' || (typeof showTooltip === 'function' && !!showTooltip({ value, row, rowIndex, field })))) ? (
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
