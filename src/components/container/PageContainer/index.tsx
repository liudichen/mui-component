import { forwardRef } from 'react';
import type { ReactNode, PropsWithChildren } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import type { CardProps, SxProps } from '@mui/material';

export interface PageContainerProps extends Omit<CardProps, 'title' | 'content'> {
  /** 显示边框?
   * @default true
   */
  border?: boolean,
  boxShadow?: boolean,
  /** 用CardContent包裹children内容？
   * @default true
  */
  content?: boolean,
  contentClass?: string,
  contentSx?: SxProps,
  darkTitle?: boolean,
  secondary?: ReactNode,
  shadow?: string,
  sx?: SxProps,
  title?: ReactNode,
  /** 传递给CardHeader，即title的外层的sx */
  headerSx?: SxProps,
  /** 显示分割线
   * @default true
   */
  divider?: boolean,
}


export const PageContainer = forwardRef<any, PropsWithChildren<PageContainerProps>>((
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
    divider = true,
    ...otherProps
  },
  ref,
) => {
  const theme = useTheme();
  const headerSx = { '& .MuiCardHeader-action': { mr: 0 }, py: 2, ...(headerSxProps || {}) };
  const showHeader = Boolean(title || secondary);
  return (
    <Card
      ref={ref}
      {...otherProps}
      sx={{
        border: border ? '1px solid' : 'none',
        // @ts-ignore
        borderColor: theme.palette.primary[200] + 75,
        ':hover': {
          boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit',
        },
        ...(sx || {}),
      }}
    >
      { showHeader && (
        <CardHeader sx={headerSx} title={darkTitle ? <Typography variant="h3">{title}</Typography> : title} action={secondary} />
      )}
      { divider && showHeader && <Divider />}

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
