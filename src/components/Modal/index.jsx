import React from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link, useTheme, Paper, useMediaQuery, Tooltip } from '@mui/material';
import Close from '@mui/icons-material/Close';
import Draggable from 'react-draggable';
import classNames from 'classnames';

import { useId } from '../../hooks';

const Modal = (props) => {
  const {
    trigger, triggerProps,
    onConfirm: onConfirmProp, onCancel: onCancelProp,
    cancelText, confirmText, showConfirm, showCancel, cancelProps, confirmProps, extraActions,
    showCloseIcon,
    CloseIcon,
    showActions,
    title, titleProps,
    contentProps, actionsProps, open: openProp, onClose: onCloseProp,
    children, disabled,
    PaperComponent, fullScreen, draggable, responsive, breakpoint,
    ...restProps
  } = props;
  const theme = useTheme();
  const down = useMediaQuery(theme.breakpoints.down(breakpoint));
  const titleId = useId();
  const [ open, setOpen ] = useSafeState(false);
  const onClose = useMemoizedFn(async (e, reason) => {
    const res = await onCloseProp?.(e, reason);
    if (trigger && res !== false) {
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
  const DraggablePaper = useMemoizedFn((props) => {
    const { handle = `.${titleId}`, cancel = '[class*="MuiDialogContent-root"]', ...restProps } = props;
    return (
      <Draggable handle={handle} cancel={cancel}>
        <Paper {...restProps} />
      </Draggable>
    );
  });
  return (
    <>
      {!!trigger && (
        <Link
          underline='none'
          {...(triggerProps || {})}
          sx={{ cursor: 'pointer', ...(triggerProps?.sx || {}) }}
          onClick={(e) => {
            if (!disabled) {
              setOpen(true);
              triggerProps?.onClick?.(e);
            }
          } }
        >
          {trigger}
        </Link>
      )}
      <Dialog
        {...restProps}
        fullScreen={fullScreen ?? (responsive ? down : undefined)}
        PaperComponent={PaperComponent ?? (draggable ? DraggablePaper : undefined)}
        open={trigger ? open : !!openProp}
        onClose={onClose}
      >
        <DialogTitle
          {...(titleProps || {})}
          className={classNames(titleId, titleProps?.className)}
          sx={{ fontSize: '16px', ...(titleProps?.sx || {}) }}
        >
          { title }
          { showCloseIcon && (
            <Tooltip arrow placement='top' title='关闭'>
              <IconButton
                aria-label='close'
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                { CloseIcon || <Close /> }
              </IconButton>
            </Tooltip>
          )}
        </DialogTitle>
        <DialogContent {...(contentProps || {})}>
          {children}
        </DialogContent>
        { showActions && (
          <DialogActions {...(actionsProps || {})}>
            { extraActions }
            { showCancel && (
              <Button
                variant='outlined'
                color='secondary'
                children={cancelText}
                {...(cancelProps || {})}
                onClick={onCancel}
              />
            )}
            { showConfirm && (
              <Button
                variant='contained'
                color='primary'
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
};

Modal.defaultProps = {
  fullWidth: true,
  showCloseIcon: true,
  showCancel: true,
  cancelText: '取消',
  showConfirm: true,
  confirmText: '确认',
  showActions: true,
  breakpoint: 'md',
};

export default Modal;
