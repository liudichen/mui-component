/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-15 22:12:22
 * @LastEditTime: 2022-10-01 19:18:44
 */
import React from 'react';
import { DialogProps, DialogTitleProps, DialogContentProps, DialogActionsProps, LinkProps, ButtonProps } from '@mui/material';

export interface ModalProps extends DialogProps {
  showActions?: boolean,
  showCloseIcon?: boolean,
  CloseIcon?: React.ReactNode,
  showCancel?: boolean,
  onCancel?: () => void,
  cancelText?: React.ReactNode | React.ReactNode[],
  cancelProps?: Omit<ButtonProps, 'onClick'>,
  showConfirm?: boolean,
  onConfirm?: () => void,
  confirmText?: React.ReactNode | React.ReactNode[],
  confirmProps?: Omit<ButtonProps, 'onClick'>,
  extraActions?: React.ReactNode | React.ReactNode[],
  trigger?: React.ReactNode,
  triggerProps?: LinkProps,
  title?: React.ReactNode,
  titleProps?: DialogTitleProps,
  contentProps?: DialogContentProps,
  actionsProps?: DialogActionsProps,
  disabled?: boolean,
}

interface IRefValue {
  onClose: () => void,
}

declare const Modal: React.ForwardRefRenderFunction<IRefValue, ModalProps>;

export default Modal;
