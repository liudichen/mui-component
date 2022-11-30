import React from 'react';
import { DialogProps, DialogTitleProps, DialogContentProps, DialogActionsProps, LinkProps, ButtonProps } from '@mui/material';

export interface ModalProps extends DialogProps {
  /** 显示底部按钮区域? */
  showActions?: boolean,
  /** 显示右上角的关闭按钮? */
  showCloseIcon?: boolean,
  /** 自定义右上角按钮图标 */
  CloseIcon?: React.ReactNode,
  /** 显示取消按钮? */
  showCancel?: boolean,
  onCancel?: () => void,
  cancelText?: React.ReactNode | React.ReactNode[],
  /** 取消按钮的Props? */
  cancelProps?: Omit<ButtonProps, 'onClick'>,
  /** 显示确认按钮? */
  showConfirm?: boolean,
  onConfirm?: () => void,
  confirmText?: React.ReactNode | React.ReactNode[],
  /** 确认按钮的Props? */
  confirmProps?: Omit<ButtonProps, 'onClick'>,
  /** 底部额外的按钮等,会显示在取消按钮左侧   */
  extraActions?: React.ReactNode | React.ReactNode[],
  /** 点击触发弹窗打开的ReactNode，如果不传递此prop，则open使用外部受控模式 */
  trigger?: React.ReactNode,
  /** trigger包裹的Link组件的props */
  triggerProps?: LinkProps,
  /** 对话框标题 */
  title?: React.ReactNode,
  /** 标题包裹的DialogTitle的props */
  titleProps?: DialogTitleProps,
  /** 内容区包裹的DialogContent的props */
  contentProps?: DialogContentProps,
  /** 底部按钮区包裹的DialogActions的props */
  actionsProps?: DialogActionsProps,
  /** 禁止trigger触发? */
  disabled?: boolean,
  /** 可拖拽标题移动Modal？ */
  draggable?: boolean,
  /** 响应式全屏？，默认断点为md */
  responsive?: boolean,
  /** 响应式全屏的断点
   * @default 'md'
  */
  breakpoint?: 'xs' | 'sml' | 'md' | 'lg' | 'xl',
}

declare const Modal: React.FC<React.PropsWithChildren<ModalProps>>;

export default Modal;
