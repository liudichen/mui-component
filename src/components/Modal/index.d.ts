import React from 'react';
import { DialogProps, DialogTitleProps, DialogContentProps, DialogActionsProps, LinkProps, ButtonProps, IconButtonProps, BoxProps } from '@mui/material';

export interface ModalProps extends DialogProps {
  /** 显示底部按钮区域? */
  showActions?: boolean,
  /** 显示右上角的关闭按钮? */
  showCloseIcon?: boolean,
  /** 自定义右上角按钮图标 */
  CloseIcon?: React.ReactNode,
  /** 传递给关闭按钮包裹的IconButton的props
   * @default 原始状态{sx:{px:0.25,py:0.5}}
   */
  closeIconButtonProps?: IconButtonProps,
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
  /** 底部额外的按钮等,会显示在取消/重置按钮左侧   */
  extraActions?: React.ReactNode | React.ReactNode[],
  /** 点击触发弹窗打开的ReactNode，如果不传递此prop，则open使用外部受控模式 */
  trigger?: React.ReactNode,
  /** trigger包裹的Link组件的props */
  triggerProps?: LinkProps,
  /** 对话框标题 */
  title?: React.ReactNode,
  /** 标题包裹的DialogTitle的props
   * @default 原始状态{display:'flex',alginItems:'start',bgcolor:'#f5f5f5',sx:{padding:0}}
  */
  titleProps?: DialogTitleProps,
  /** 包裹title内容的Box的props
   * @default 初始状态{flex:1,fontSize:'16px',height:'100%',alignSelf:'center',marginLeft:1.5,marginY:0.5}
   */
  titleBoxProps?: BoxProps,
  /** 内容使用DialogContent包裹?
   * @default true
   * 不包裹的话还可以使用使用多个DialogContent
   */
  withDialogContentWrapper?: boolean,
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
  /** 内容，优先级高于children */
  content?: React.ReactNode | React.ReactNode[],
  /** 受控属性 */
  setOpen?: (open: boolean) => void,
}

export declare const Modal: React.ForwardRefRenderFunction<{onClose: () => void}, React.PropsWithChildren<ModalProps>>;
