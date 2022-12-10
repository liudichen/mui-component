import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

export const Loading = (props) => {
  const { label, value, color, size, variant, sx, containerSx, containerProps, labelBoxProps, labelTypographyProps, children, ...restProps } = props;
  return (
    <Box
      position='relative'
      display='inline-block'
      {...(containerProps || {})}
      sx={{
        ...(containerProps?.sx || {}),
        ...(containerSx || {}),
      }}
    >
      <CircularProgress
        color={color}
        value={value}
        variant={variant}
        size={size}
        sx={sx}
        {...restProps}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position='absolute'
        display='flex'
        alignItems='center'
        justifyContent='center'
        {...(labelBoxProps || {})}
      >
        { (typeof value !== 'undefined' || !!label || !!children) && (
          <Typography variant='caption' component='div' color='GrayText.secondary' {...(labelTypographyProps || {})}>
            { typeof value === 'undefined' ? (label || children) : (
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
  label: '',
  variant: 'indeterminate',
};

Loading.displayName = 'iimm.Mui.Loading';
