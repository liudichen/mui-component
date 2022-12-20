import type { ReactNode, FC, Dispatch, SetStateAction, ComponentType, PropsWithChildren } from 'react';
import { CardProps, SxProps } from '@mui/material';

export interface ContentCardProps extends CardProps {
  content?: boolean, // true
  contentClass?: string,
  contentSx?: SxProps,
  darkTitle?: boolean,
  secondary?: ReactNode,
  sx?: SxProps,
  title?: ReactNode,
  defaultCollapsed?: boolean,
  collapsible?: boolean,
  /** 受控属性 ，与setCollapsed配合使用*/
  collapsed?: boolean,
  /** 受控属性 ，与collapsed配合使用*/
  setCollapsed?: Dispatch<SetStateAction<boolean>>,
  headerSx?: SxProps,
  contentSx?: SxProps,
  iconColor?: 'primary'| 'default' | 'secondary' | 'error' | 'info' | 'success' |'warning',
  CollapseIcon?: ComponentType,
  unmountOnExit?: boolean,
}

export declare const ContentCard: FC<PropsWithChildren<ContentCardProps>>;
