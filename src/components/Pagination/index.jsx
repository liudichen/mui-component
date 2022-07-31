/* eslint-disable no-unused-vars */
/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-07-22 09:33:14
 * @LastEditTime: 2022-07-31 10:55:00
 */
import PropTypes from 'prop-types';
import React from 'react';
import { useControllableValue, useCreation, useMemoizedFn, useUpdateEffect } from 'ahooks';
import { Pagination as MuiPagination, Box, Stack, Select, MenuItem, Typography } from '@mui/material';
import { sx } from '../../propTypes';


const Pagination = (props) => {
  const { paginationBoxProps, paginationStackProps, showPageSize, pageSizeOptions, pageSizeSelectProps, page, count, onChange, onPageChange: onPageChangeProp, onPageSizeChange: onPageSizeChangeProp, pageSize: pageSizeProp, total: totalProp, showItemRange,
    ...restProps } = props;
  const [ current, onPageChange ] = useControllableValue(props, { valuePropName: 'current', trigger: 'onPageChange', defaultValue: 1, defaultValuePropName: 'defaultPage' });
  const [ pageSize, onPageSizeChange ] = useControllableValue(props, { valuePropName: 'pageSize', trigger: 'onPageSizeChange', defaultValuePropName: 'defaultPageSize', defaultValue: pageSizeOptions[0] });
  // 这里 total是指总页数，而totalProp是指总条目数
  const total = useCreation(() => Math.ceil((totalProp || 0) / (pageSize || 1)), [ totalProp, pageSize ]);
  const resetPageSize = useMemoizedFn(() => {
    if ((current - 1) * pageSize >= total) {
      onPageChange(1);
    }
  });
  useUpdateEffect(() => {
    resetPageSize();
  }, [ total ]);
  return (
    <Box
      marginTop={1}
      {...(paginationBoxProps || {})}
    >
      <Stack
        direction='row'
        alignItems='center'
        spacing={0.5}
        {...(paginationStackProps || {})}
      >
        {showItemRange && !!totalProp && (
          <Typography
            variant='h5'
          >
            第{(current - 1) * pageSize + 1}-{Math.min(totalProp, current * pageSize)}项/共{totalProp}项&ensp;
          </Typography>
        )}
        {showPageSize && (
          <Select
            size='small'
            variant='standard'
            value={pageSize}
            onChange={(e) => onPageSizeChange(+e.target?.value || pageSizeOptions[0])}
            {...(pageSizeSelectProps || {})}
          >
            { pageSizeOptions.map((item) => (
              <MenuItem
                value={item}
                key={item}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        )}
        <MuiPagination
          page={current}
          count={total}
          onChange={(e, p) => onPageChange(p)}
          {...restProps}
        />
      </Stack>
    </Box>
  );
};

Pagination.defaultProps = {
  showPageSize: true,
  showItemRange: true,
  pageSizeOptions: [ 10, 25, 50, 100, 200 ],
  siblingCount: 0,
  size: 'small',
  boundaryCount: 1,
  hideNextButton: true,
  hidePrevButton: true,
  variant: 'outlined',
};

Pagination.propTypes = {
  paginationBoxProps: PropTypes.object,
  paginationStackProps: PropTypes.object,
  pageSizeSelectProps: PropTypes.object,
  showPageSize: PropTypes.bool,
  showItemRange: PropTypes.bool,
  total: PropTypes.number,
  current: PropTypes.number,
  defaultPage: PropTypes.number,
  pageSize: PropTypes.number,
  defaultPageSize: PropTypes.number,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  boundaryCount: PropTypes.number,
  classes: PropTypes.object,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  getItemAriaLabel: PropTypes.func,
  hideNextButton: PropTypes.bool,
  hidePrevButton: PropTypes.bool,
  renderItem: PropTypes.func,
  shape: PropTypes.oneOf([ 'circular', 'rounded' ]),
  showFirstButton: PropTypes.bool,
  showLastButton: PropTypes.bool,
  siblingCount: PropTypes.number,
  size: PropTypes.string,
  sx,
  variant: PropTypes.oneOfType([
    PropTypes.oneOf([ 'outlined', 'text' ]),
    PropTypes.string,
  ]),
};

export default Pagination;
