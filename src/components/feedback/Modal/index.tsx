import React, {
  createContext,
  useContext,
  forwardRef,
  useImperativeHandle,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { useCreation, useControllableValue, useMemoizedFn } from "ahooks";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  useTheme,
  useMediaQuery,
  Paper,
  Tooltip,
} from "@mui/material";
import classNames from "classnames";
import { IconCircleX } from "@tabler/icons-react";
import type {
  DialogProps,
  DialogTitleProps,
  DialogContentProps,
  DialogActionsProps,
  LinkProps,
  ButtonProps,
  IconButtonProps,
  BoxProps,
} from "@mui/material";
import { useId } from "@iimm/react-shared";
import Draggable from "react-draggable";

const ModalOpenContentext = createContext<boolean>(null);
export const useModalOpen = () => useContext(ModalOpenContentext);

export const Modal = forwardRef<any, PropsWithChildren<ModalProps>>((props, ref) => {
  const {
    trigger,
    triggerProps,
    onConfirm: onConfirmProp,
    onCancel: onCancelProp,
    cancelText,
    confirmText,
    showConfirm,
    showCancel,
    cancelProps,
    confirmProps,
    extraActions,
    showCloseIcon,
    closeIconButtonProps,
    CloseIcon,
    showActions,
    title,
    titleProps,
    titleBoxProps,
    contentProps,
    actionsProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    open: openProp,
    onClose: onCloseProp,
    setOpen: setOpenProp,
    children,
    disabled,
    content,
    withDialogContentWrapper,
    PaperComponent,
    fullScreen: fullScreenProp,
    draggable: draggableProp,
    responsive,
    breakpoint = "md",
    ...restProps
  } = props;
  const theme = useTheme();
  const tId = useId();
  const down = useMediaQuery(theme.breakpoints.down(breakpoint));
  const fullScreen = fullScreenProp ?? (responsive ? down : undefined);
  const draggable = draggableProp && !fullScreen;
  const [open, setOpen] = useControllableValue(props, {
    defaultValue: false,
    valuePropName: "open",
    trigger: "setOpen",
  });
  const onClose = useMemoizedFn(async (e?: any, reason?: any) => {
    const res = (await onCloseProp?.(e, reason)) as any;
    if (res !== false) {
      setOpen(false);
    }
  });
  const onConfirm = useMemoizedFn(async () => {
    const res = await onConfirmProp?.();
    if (res !== false) {
      onClose();
    }
  });
  const onCancel = useMemoizedFn(async () => {
    const res = await onCancelProp?.();
    if (res !== false) {
      onClose();
    }
  });
  const Commponent = useCreation(() => {
    if (!draggable) return undefined;
    return (props: any) => (
      <Draggable handle={`#${tId}`}>
        <Paper {...props} />
      </Draggable>
    );
  }, [draggable, tId]);

  useImperativeHandle(ref, () => ({ onClose }), [onClose]);

  return (
    <>
      {!!trigger && (
        <Link
          underline="none"
          {...(triggerProps || {})}
          sx={{ cursor: "pointer", ...(triggerProps?.sx || {}) }}
          onClick={(e) => {
            if (!disabled) {
              setOpen(true);
              triggerProps?.onClick?.(e);
            }
          }}
        >
          {trigger}
        </Link>
      )}
      <Dialog
        {...restProps}
        fullScreen={fullScreen}
        PaperComponent={PaperComponent ?? Commponent}
        open={!!open}
        onClose={onClose}
      >
        {(!!title || showCloseIcon) && (
          <DialogTitle
            display="flex"
            alignItems="start"
            bgcolor="#f5f5f5"
            {...(titleProps || {})}
            className={classNames("dialog-draggable-title", titleProps?.className)}
            sx={{ padding: 0, ...(titleProps?.sx || {}) }}
          >
            <Box
              id={tId}
              flex={1}
              fontSize="16px"
              height="100%"
              alignSelf="center"
              maxHeight="60px"
              marginLeft={1.5}
              marginY={0.5}
              {...(titleBoxProps || {})}
              sx={draggable ? { cursor: "move", ...(titleBoxProps?.sx || {}) } : titleBoxProps?.sx}
            >
              {title}
            </Box>
            {showCloseIcon && (
              <Tooltip arrow placement="top" title="关闭">
                <IconButton
                  sx={{ px: 0.25, py: 0.5 }}
                  {...(closeIconButtonProps || {})}
                  aria-label="close"
                  onClick={onClose}
                >
                  {CloseIcon || <IconCircleX size="1.5em" stroke="1.5px" color="#8c8c8c" />}
                </IconButton>
              </Tooltip>
            )}
          </DialogTitle>
        )}
        <ModalOpenContentext.Provider value={open}>
          {withDialogContentWrapper ? (
            <DialogContent {...(contentProps || {})}>{content ?? children}</DialogContent>
          ) : (
            content ?? children
          )}
        </ModalOpenContentext.Provider>
        {showActions && (
          <DialogActions {...(actionsProps || {})}>
            {extraActions}
            {showCancel && (
              <Button
                variant="outlined"
                color="secondary"
                children={cancelText}
                {...(cancelProps || {})}
                onClick={onCancel}
              />
            )}
            {showConfirm && (
              <Button
                variant="contained"
                color="primary"
                children={confirmText}
                {...(confirmProps || {})}
                onClick={onConfirm}
              />
            )}
          </DialogActions>
        )}
      </Dialog>
    </>
  );
});

Modal.defaultProps = {
  fullWidth: true,
  showCloseIcon: true,
  showCancel: true,
  cancelText: "取消",
  showConfirm: true,
  confirmText: "确认",
  showActions: true,
  breakpoint: "md",
  withDialogContentWrapper: true,
};

Modal.displayName = "iimm.Mui.Modal";

export interface ModalProps extends Omit<DialogProps, "open" | "title" | "content"> {
  /** 受控属性,控制是否开启 */
  open?: boolean;
  /** 受控属性 */
  setOpen?: (open: boolean) => void;
  /** 显示底部按钮区域? */
  showActions?: boolean;
  /** 显示右上角的关闭按钮? */
  showCloseIcon?: boolean;
  /** 自定义右上角按钮图标 */
  CloseIcon?: ReactNode;
  /** 传递给关闭按钮包裹的IconButton的props
   * @default 原始状态{sx:{px:0.25,py:0.5}}
   */
  closeIconButtonProps?: IconButtonProps;
  /** 显示取消按钮? */
  showCancel?: boolean;
  onCancel?: (() => any) | (() => Promise<any>);
  cancelText?: ReactNode | ReactNode[];
  /** 取消按钮的Props? */
  cancelProps?: Omit<ButtonProps, "onClick">;
  /** 显示确认按钮? */
  showConfirm?: boolean;
  onConfirm?: (() => any) | (() => Promise<any>);
  confirmText?: ReactNode | ReactNode[];
  /** 确认按钮的Props? */
  confirmProps?: Omit<ButtonProps, "onClick">;
  /** 底部额外的按钮等,会显示在取消/重置按钮左侧   */
  extraActions?: ReactNode | ReactNode[];
  /** 点击触发弹窗打开的ReactNode，如果不传递此prop，则open使用外部受控模式 */
  trigger?: ReactNode;
  /** trigger包裹的Link组件的props */
  triggerProps?: LinkProps;
  /** 对话框标题 */
  title?: ReactNode;
  /** 标题包裹的DialogTitle的props
   * @default 原始状态{display:'flex',alginItems:'start',bgcolor:'#f5f5f5',sx:{padding:0}}
   */
  titleProps?: DialogTitleProps;
  /** 包裹title内容的Box的props
   * @default 初始状态{flex:1,fontSize:'16px',height:'100%',alignSelf:'center',marginLeft:1.5,marginY:0.5,maxHeight:'60px'}
   */
  titleBoxProps?: BoxProps;
  /** 内容使用DialogContent包裹?
   * @default true
   * 不包裹的话还可以使用使用多个DialogContent
   */
  withDialogContentWrapper?: boolean;
  /** 内容区包裹的DialogContent的props */
  contentProps?: DialogContentProps;
  /** 底部按钮区包裹的DialogActions的props */
  actionsProps?: DialogActionsProps;
  /** 禁止trigger触发? */
  disabled?: boolean;
  /** 可拖拽标题移动Modal？ */
  draggable?: boolean;
  /** 响应式全屏？，默认断点为md */
  responsive?: boolean;
  /** 响应式全屏的断点
   * @default 'md'
   */
  breakpoint?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  /** 内容，优先级高于children */
  content?: ReactNode | ReactNode[];
}
