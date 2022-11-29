import React from 'react';
import { PopoverProps as MuiPopoverProps } from '@mui/material';

export interface PopoverProps extends MuiPopoverProps {
  /** 触发弹出的操作,鼠标悬停或点击 */
  triggerType?: 'hover' | 'click',
  disabled?: boolean,
  trigger?: React.ReactNode,
  content?: React.ReactNode,
}

/** 点击或悬停触发的展示信息的组件 */
export declare const Popover: React.ForwardRefExoticComponent<React.PropsWithChildren<PopoverProps>>;
