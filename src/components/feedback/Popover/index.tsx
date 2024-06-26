import { type ReactNode, type PropsWithChildren, forwardRef } from "react";
import { useMemoizedFn, useSafeState } from "ahooks";
import { Popover as MuiPopover } from "@mui/material";
import type { PopoverProps as MuiPopoverProps } from "@mui/material";
import { useId } from "@iimm/react-shared";

export interface PopoverProps extends Omit<MuiPopoverProps, "onClose" | "content" | "open"> {
  /** 触发弹出的操作,鼠标悬停或点击 */
  triggerType?: "hover" | "click";
  disabled?: boolean;
  trigger: ReactNode;
  content?: ReactNode;
  onClose?: () => void;
  open?: boolean;
}

export const Popover = forwardRef<any, PropsWithChildren<PopoverProps>>((props, ref) => {
  const {
    onClose: onCloseProp,
    triggerType = "hover",
    disabled,
    trigger,
    id: idProp,
    content,
    children,
    ...restProps
  } = props;
  const [anchorE1, setAnchorE1] = useSafeState(null);
  const id = useId(idProp);
  const handleColse = useMemoizedFn(() => {
    if (anchorE1 && !disabled) {
      setAnchorE1(null);
      onCloseProp?.();
    }
  });
  const handleOpen = useMemoizedFn((e) => {
    if (!disabled) {
      setAnchorE1(e.currentTarget);
    }
  });
  const open = Boolean(anchorE1);
  return (
    <>
      <span
        aria-owns={open ? id : undefined}
        aria-haspopup="true"
        onMouseEnter={triggerType === "hover" ? handleOpen : undefined}
        onMouseLeave={triggerType === "hover" ? handleColse : undefined}
        onClick={triggerType === "click" ? handleOpen : undefined}
        style={{ cursor: "help" }}
      >
        {trigger}
      </span>
      <MuiPopover
        ref={ref}
        id={id}
        onClose={handleColse}
        anchorEl={anchorE1}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        slotProps={{ paper: { sx: { p: 0.5, borderRadius: 2 } } }}
        // @ts-ignore
        open={open}
        disableRestoreFocus={triggerType === "hover"}
        {...restProps}
        sx={{
          ...(restProps?.sx || {}),
          pointerEvents: triggerType === "hover" ? "none" : undefined,
        }}
      >
        {content ?? children}
      </MuiPopover>
    </>
  );
});
