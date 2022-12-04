// this component origin from https://berrydashboard.io
import React, { forwardRef } from 'react';
import { useToggle } from 'ahooks';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Collapse, Divider, IconButton, Typography } from '@mui/material';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';

export const ContentCard = forwardRef(({
  children,
  content,
  contentClass,
  darkTitle,
  secondary,
  sx,
  contentSx,
  headerSx,
  collapsed,
  handleCollapse,
  collapsible,
  iconColor,
  defaultCollapsed,
  unmountOnExit,
  title,
  CollapseIcon,
  ...others
}, ref) => {
  const theme = useTheme();
  const [ expand, { toggle }] = useToggle(collapsible ? !defaultCollapsed : true);
  const renderAction = (
    <>
      {secondary ?? null}
      {!!collapsible && <>&nbsp;</>}
      { !!collapsible && (
        <IconButton
          onClick={typeof collapsed === 'undefined' ? toggle : handleCollapse}
          style={{
            transform: (typeof collapsed === 'undefined' ? !expand : collapsed) ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
          sx={{
            mb: -1,
            mt: -1,
          }}
        >
          <CollapseIcon color={iconColor} />
        </IconButton>
      )}
    </>
  );
  return (
    <Card
      ref={ref}
      sx={{
        border: '1px solid',
        borderColor: theme.palette.primary.light,
        ':hover': {
          boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
        },
        ...sx,
      }}
      {...others}
    >
      {/* card header and action */}
      {!darkTitle && title && <CardHeader sx={{ p: 1.5, ...headerSx }} title={<Typography variant="h5">{title}</Typography>} action={renderAction} />}
      {darkTitle && title && <CardHeader sx={{ p: 1.5, ...headerSx }} title={<Typography variant="h4">{title}</Typography>} action={renderAction} />}
      <Collapse in={typeof collapsed === 'undefined' ? expand : !collapsed} timeout='auto' unmountOnExit={unmountOnExit}>
        {/* content & header divider */}
        {title && (
          <Divider
            sx={{
              opacity: 1,
              borderColor: theme.palette.primary.light,
            }}
          />
        )}

        {/* card content */}
        {content && (
          <CardContent sx={{ p: 2.5, ...contentSx }} className={contentClass || ''}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Collapse>
    </Card>
  );
});

ContentCard.defaultProps = {
  collapsible: false,
  defaultCollapsed: false,
  content: true,
  headerSx: {},
  contentSx: {},
  sx: {},
  iconColor: 'secondary',
  CollapseIcon: ExpandCircleDownOutlinedIcon,
};
