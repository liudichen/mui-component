// this component origin from https://berrydashboard.io
import React, { forwardRef, useEffect } from 'react';
import type { ReactNode, Dispatch, SetStateAction, PropsWithChildren } from 'react';
import { useControllableValue } from 'ahooks';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Collapse, Divider, IconButton, Typography } from '@mui/material';
import type { CardProps, SxProps, TypographyProps, DividerProps } from '@mui/material';
import { ExpandCircleDownOutlined as ExpandCircleDownOutlinedIcon } from '@mui/icons-material';

export interface ContentCardProps extends Omit<CardProps, 'title'> {
  content?: boolean, // true
  contentClass?: string,
  darkTitle?: boolean,
  secondary?: ReactNode,
  sx?: SxProps,
  title?: ReactNode,
  /** 传递给标题Typography的props */
  titleProps?: TypographyProps,
  defaultCollapsed?: boolean,
  collapsible?: boolean,
  /** 受控属性 ，与setCollapsed配合使用*/
  collapsed?: boolean,
  /** 受控属性 ，与collapsed配合使用*/
  setCollapsed?: Dispatch<SetStateAction<boolean>>,
  headerSx?: SxProps,
  contentSx?: SxProps,
  iconColor?: 'primary' | 'secondary' | 'error' | 'info' | 'success' |'warning' | 'inherit' | 'action' | 'disabled',
  CollapseIcon?: typeof ExpandCircleDownOutlinedIcon,
  unmountOnExit?: boolean,
  dividerProps?: DividerProps,
}

export const ContentCard = forwardRef<any, PropsWithChildren<ContentCardProps>>((props, ref) => {
  const {
    children,
    content,
    contentClass,
    darkTitle,
    secondary,
    sx,
    contentSx,
    headerSx,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    collapsed: collapsedProp, setCollapsed: setCollapsedProp, defaultCollapsed,
    collapsible,
    iconColor = 'secondary',
    unmountOnExit,
    title,
    titleProps,
    dividerProps,
    CollapseIcon = ExpandCircleDownOutlinedIcon,
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
      { collapsible && !!CollapseIcon && (
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
          sx={{ opacity: 1, borderColor: theme.palette.primary.light }}
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


ContentCard.displayName = 'iimm.Mui.ContentCard';
