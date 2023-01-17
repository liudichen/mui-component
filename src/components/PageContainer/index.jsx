import React, { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

export const PageContainer = forwardRef((
  {
    border = true,
    boxShadow,
    children,
    content = true,
    contentClass = '',
    contentSx = {},
    darkTitle,
    secondary,
    shadow,
    sx = {},
    title,
    headerSx: headerSxProps,
    ...otherProps
  },
  ref
) => {
  const theme = useTheme();
  const headerSx = { '& .MuiCardHeader-action': { mr: 0 }, ...(headerSxProps || {}) };
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
        ...(sx || {}),
      }}
    >
      { !darkTitle && !!title && (
        <CardHeader sx={headerSx} title={title} action={secondary} />
      )}
      { darkTitle && !!title && (
        <CardHeader sx={headerSx} title={<Typography variant="h3">{title}</Typography>} action={secondary} />
      )}

      {!!title && <Divider />}

      { content && (
        <CardContent sx={contentSx} className={contentClass}>
          {children}
        </CardContent>
      )}
      { !content && children}
    </Card>
  );
});

PageContainer.displayName = 'iimm.Mui.PageContainer';
