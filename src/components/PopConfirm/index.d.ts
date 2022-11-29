import React from 'react';
import { PopperProps, ButtonProps, PaperProps, LinkProps } from '@mui/material';

export interface PopConfirmProps extends PopperProps {
  arrow?: boolean,
  timeout?: number,
  preventOverflow?: boolean,
  triggerProps?: Omit<LinkProps, 'onClick'>,
  rootProps?: PaperProps,
  disabled?: boolean,
  closeOnClickAway?: boolean,
  showConfirm?: boolean,
  confirmText?: React.ReactNode | React.ReactNode[],
  confirmProps?: Omit<ButtonProps, 'onClick'>,
  onConfirm?: () => void,
  showCancel?: boolean,
  cancelText?: React.ReactNode | React.ReactNode[],
  cancelProps?: Omit<ButtonProps, 'onClick'>,
  onCancel?: () => void,
  showTitle?: boolean,
  title?: React.ReactNode | React.ReactNode[],
  showIcon?: boolean,
  icon?: React.ReactNode,
  extraContent?: React.ReactNode | React.ReactNode[],
}

declare const PopConfirm: React.ForwardRefExoticComponent<React.PropsWithChildren<PopConfirmProps>>;

export default PopConfirm;
