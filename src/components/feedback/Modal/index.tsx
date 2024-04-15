import {
  forwardRef,
  type PropsWithChildren,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useEffect,
  type MouseEvent,
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
  Tooltip,
  Paper,
} from "@mui/material";
import type {
  DialogProps,
  DialogTitleProps,
  DialogContentProps,
  DialogActionsProps,
  LinkProps,
  ButtonProps,
  IconButtonProps,
  BoxProps,
  PaperProps,
} from "@mui/material";
import { IconArrowsMaximize, IconArrowsMinimize, IconCircleX } from "@tabler/icons-react";
import { Space, useGlobalId } from "@iimm/react-shared";
import Draggable from "react-draggable";

const stopPropagationOnClick = (e?: MouseEvent<HTMLElement>) => e?.stopPropagation();

export const Modal = forwardRef<any, PropsWithChildren<ModalProps>>((props, ref) => {
  const {
    trigger,
    triggerProps,
    onConfirm: onConfirmProp,
    onCancel: onCancelProp,
    cancelText = "取消",
    confirmText = "确认",
    showConfirm = true,
    showCancel = true,
    cancelProps,
    confirmProps,
    extraActions,
    showCloseIcon = true,
    closeIconButtonProps,
    CloseIcon,
    showActions = true,
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
    withDialogContentWrapper = true,
    PaperComponent,
    fullScreen: fullScreenProp,
    setFullScreen: setFullScreenProp,
    showFullScreen,
    draggable: draggableProp,
    responsive,
    breakpoint = "md",
    fullWidth = true,
    ...restProps
  } = props;

  const theme = useTheme();
  const tId = useGlobalId();

  const down = useMediaQuery(theme.breakpoints.down(breakpoint));

  const [fullScreen, setFullScreen] = useControllableValue(props, {
    trigger: "setFullScreen",
    valuePropName: "fullScreen",
    defaultValue: false,
  });

  const draggable = !!draggableProp && !fullScreen;

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

  const onFullScreenClick = useCreation(() => () => setFullScreen((f) => !f), [setFullScreen]);

  const syncResponsiveFullScreen = useMemoizedFn(() => {
    if (!responsive) return;
    if (down && !fullScreen) {
      setFullScreen(true);
    } else if (!down && fullScreen) {
      setFullScreen(false);
    }
  });

  useEffect(() => {
    syncResponsiveFullScreen();
  }, [responsive, down]);

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
    return (props: PaperProps) => (
      <Draggable handle={`#${tId}`} cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }, [draggable, tId]);
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
        ref={ref}
        {...restProps}
        fullWidth={fullWidth}
        fullScreen={fullScreen}
        PaperComponent={PaperComponent ?? Commponent}
        open={!!open}
        onClose={onClose}
      >
        {(!!title || showCloseIcon || showFullScreen) && (
          <DialogTitle
            display="flex"
            alignItems="start"
            bgcolor="#f5f5f5"
            onClick={stopPropagationOnClick}
            {...(titleProps || {})}
            sx={{ padding: 0, ...(titleProps?.sx || {}) }}
          >
            <Box
              flex={1}
              fontSize="16px"
              height="100%"
              alignSelf="center"
              maxHeight="60px"
              marginLeft={1.5}
              marginY={0.5}
              {...(titleBoxProps || {})}
              id={tId}
              sx={{ minHeight: 24, ...(draggable ? { cursor: "move" } : {}), ...(titleBoxProps?.sx || {}) }}
            >
              {title}
            </Box>
            <Space size={4} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              {showFullScreen && (
                <Tooltip arrow placement="top" title={fullScreen ? "退出全屏" : "全屏"}>
                  <IconButton color="primary" sx={{ px: 0.25, py: 0.5 }} onClick={onFullScreenClick}>
                    {fullScreen ? (
                      <IconArrowsMinimize size="1em" stroke="1.5px" />
                    ) : (
                      <IconArrowsMaximize size="1em" stroke="1.5px" />
                    )}
                  </IconButton>
                </Tooltip>
              )}
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
            </Space>
          </DialogTitle>
        )}
        {withDialogContentWrapper ? (
          <DialogContent onClick={stopPropagationOnClick} sx={{ px: 1.5, mt: 0.75 }} {...(contentProps || {})}>
            {content ?? children}
          </DialogContent>
        ) : (
          content ?? children
        )}
        {showActions && (
          <DialogActions onClick={stopPropagationOnClick} {...(actionsProps || {})}>
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

export interface ModalProps extends Omit<DialogProps, "open" | "title" | "content"> {
  /** 受控属性,控制是否开启 */
  open?: boolean;
  /** 受控属性 */
  setOpen?: Dispatch<SetStateAction<boolean>>;
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
  setFullScreen?: Dispatch<SetStateAction<boolean>>;
  /**显示全屏按钮? */
  showFullScreen?: boolean;
}
