// this component origin from https://berrydashboard.io
import React, { forwardRef, useEffect } from 'react';
import { useControllableValue } from 'ahooks';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Collapse, Divider, IconButton, Typography } from '@mui/material';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';

export const ContentCard = forwardRef((props, ref) => {
  const {
    children,
    content,
    contentClass,
    darkTitle,
    secondary,
    sx,
    contentSx,
    headerSx,
    // eslint-disable-next-line no-unused-vars
    collapsed: collapsedProp, setCollapsed: setCollapsedProp, defaultCollapsed,
    collapsible,
    iconColor,
    unmountOnExit,
    title,
    titleProps,
    dividerProps,
    CollapseIcon,
    ...others
  } = props;
  const theme = useTheme();
  const [ collapsed, setCollapsed ] = useControllableValue(props, { valuePropName: 'collapsed', trigger: 'setCollapsed', defaultValue: false, defaultValuePropName: 'defaultCollapsed' });
  useEffect(() => {
    setCollapsed(!!defaultCollapsed);
  }, [ !defaultCollapsed ]);

  const renderAction = (
    <>
      {secondary ?? null}
      { collapsible && <>&nbsp;</>}
      { collapsible && (
        <IconButton
          onClick={() => setCollapsed((s) => !s)}
          style={{
            transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
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
      { !!title && (
        <CardHeader
          sx={{ p: 1.5, ...headerSx }}
          title={
            <Typography
              variant={darkTitle ? 'h4' : 'h5'}
              {...(titleProps || {})}
            >
              {title}
            </Typography>
          }
          action={renderAction} />
      )}

      { collapsible && (
        <Collapse in={!collapsed} timeout='auto' unmountOnExit={unmountOnExit}>
          { !!title && (
            <Divider
              sx={{
                opacity: 1,
                borderColor: theme.palette.primary.light,
              }}
              {...(dividerProps || {})}
            />
          )}

          { content && (
            <CardContent
              sx={{ p: 2.5, ...contentSx }}
              className={contentClass}
            >
              {children}
            </CardContent>
          )}
          {!content && children}
        </Collapse>
      )}

      {!collapsible && !!title && (
        <Divider
          sx={{ opacity: 1, borderColor: theme.primary.light }}
          {...(dividerProps || {})}
        />
      )}
      { !collapsible && content && (
        <CardContent
          sx={{ p: 2.5, ...contentSx }}
          className={contentClass}
        >
          {children}
        </CardContent>
      )}
      { !collapsible && !content && children }
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

ContentCard.displayName = 'iimm.Mui.ContentCard';
