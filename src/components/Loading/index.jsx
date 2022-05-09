/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 11:14:17
 * @LastEditTime: 2022-05-09 11:22:16
 */
import PropTypes from 'prop-types';
import { CircularProgress, Box, Typography } from '@mui/material';

import { sx } from '../../propTypes';

const Loading = (props) => {
  const { label, value, color, size, variant, sx, containerSx } = props;
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        ...containerSx,
      }}
    >
      <CircularProgress
        color={color}
        value={value}
        variant={variant}
        size={size}
        sx={sx}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        { (typeof value !== 'undefined' || !!label) && (
          <Typography variant='caption' component='div' color='GrayText.sendary'>
            { typeof value === 'undefined' ? label : (
              `${Math.round(value)}%`
            )}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

Loading.defaultProps = {
  color: 'secondary',
  size: 40,
  thickness: 3.6,
  sx: {},
  boxSx: {},
  label: '',
  variant: 'indeterminate',
};

Loading.propTypes = {
  label: PropTypes.node,
  value: PropTypes.number,
  size: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
  color: PropTypes.oneOfType([
    PropTypes.oneOf([ 'primary', 'secondary', 'error', 'info', 'success', 'warning', 'inherit' ]),
    PropTypes.string,
  ]),
  disableShrink: PropTypes.bool,
  variant: PropTypes.oneOf([ 'indeterminate', 'determinate' ]),
  thickness: PropTypes.number,
  sx,
  containerSx: sx,
};

export default Loading;
