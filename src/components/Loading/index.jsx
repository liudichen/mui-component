import { CircularProgress, Box, Typography } from '@mui/material';

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

export default Loading;
