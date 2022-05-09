/*
 * @Description: this component origin from https://berrydashboard.io
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 10:36:54
 * @LastEditTime: 2022-05-09 10:52:43
 */
import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
};

const PageContainer = forwardRef((
  {
    border = true,
    boxShadow,
    children,
    content = true,
    contentClass = '',
    contentSX = {},
    darkTitle,
    secondary,
    shadow,
    sx = {},
    title,
    ...otherProps
  },
  ref
) => {
  const theme = useTheme();

  return (
    <Card
      ref={ref}
      {...otherProps}
      sx={{
        border: border ? '1px solid' : 'none',
        borderColor: theme.palette.primary[200] + 75,
        ':hover': {
          boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit',
        },
        ...sx,
      }}
    >
      {/* card header and action */}
      {!darkTitle && title && <CardHeader sx={headerSX} title={title} action={secondary} />}
      {darkTitle && title && (
        <CardHeader sx={headerSX} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
      )}

      {/* content & header divider */}
      {title && <Divider />}

      {/* card content */}
      {content && (
        <CardContent sx={contentSX} className={contentClass}>
          {children}
        </CardContent>
      )}
      {!content && children}
    </Card>
  );
});

PageContainer.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  /** 右上角action区域   */
  secondary: PropTypes.oneOfType([ PropTypes.node, PropTypes.string, PropTypes.object ]),
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([ PropTypes.node, PropTypes.string, PropTypes.object ]),
};

export default PageContainer;
