/* eslint-disable no-unused-vars */
/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-26 15:08:09
 * @LastEditTime: 2022-05-20 14:18:35
 */
import PropTypes from 'prop-types';
import React from 'react';
import { Box } from '@mui/material';

import { sx } from '../../propTypes';

const spaceSize = {
  small: 8,
  medium: 16,
  large: 24,
};

const Space = (props) => {
  const { size, direction, children, flexDirection, split, ...restProps } = props;
  if (children === null || children === undefined) {
    return null;
  }
  const Size = Array.isArray(size) ? size : [ size, size ];
  const rowSpace = typeof Size[0] === 'number' ? Size[0] : spaceSize[Size[0] || 'small'];
  const columnSpace = typeof Size[1] === 'number' ? Size[1] : spaceSize[Size[1] || 'small'];
  return (
    <Box
      flexDirection={direction}
      {...restProps}
    >
      {React.Children.map(children, (child, index) => {
        if (!child) {
          return null;
        }
        let style = {};
        if (direction === 'column') {
          if (index < React.Children.count(children) - 1) {
            style = { marginBottom: columnSpace / (split ? 2 : 1) };
          }
        } else {
          if (index > 0) {
            style = { marginLeft: rowSpace / (split ? 2 : 1) };
          }
        }
        return (
          <>
            <div style={style}>
              {child}
            </div>
            {index < React.Children.count(children) - 1 && !!split && (
              <span style={style}>
                {split}
              </span>
            )}
          </>
        );
      })}
    </Box>
  );
};

Space.defaultProps = {
  size: 'small',
  direction: 'row',
  alignItems: 'center',
  display: 'flex',
  sx: { justifyContent: 'center' },
};

Space.propTypes = {
  size: PropTypes.oneOfType([
    PropTypes.oneOf([ 'small', 'medium', 'large' ]),
    PropTypes.arrayOf(PropTypes.oneOf([ 'small', 'medium', 'large' ])),
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  direction: PropTypes.oneOf([ 'row', 'column' ]),
  split: PropTypes.node,
  display: PropTypes.string,
  sx,
};

export default Space;
