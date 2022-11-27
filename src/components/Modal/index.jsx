import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link } from '@mui/material';
import { IconX } from '@tabler/icons';

const Modal = forwardRef((props, ref) => {
  const {
    trigger, triggerProps, onConfirm: onConfirmProp, onCancel: onCancelProp, cancelText, confirmText, showConfirm, showCancel, cancelProps, confirmProps, extraActions, showCloseIcon, CloseIcon, showActions,
    title, titleProps, contentProps, actionsProps, open: openProp, onClose: onCloseProp,
    children, disabled,
    ...restProps
  } = props;
  const [ open, setOpen ] = useSafeState(false);
  const onClose = useMemoizedFn(async (e, reason) => {
    const res = await onCloseProp?.(e, reason);
    if (trigger && res !== false) {
      setOpen(false);
    }
  });
  useImperativeHandle(ref, () => ({ onClose }));
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

  return (
    <>
      {!!trigger && (
        <Link
          {...{
            underline: 'none',
            sx: { cursor: 'pointer' },
            ...(triggerProps || {}),
            onClick: (e) => {
              if (disabled) return;
              setOpen(true);
              triggerProps?.onClick?.(e);
            },
          }
          }
        >
          {trigger}
        </Link>
      )}
      <Dialog
        {...restProps}
        open={trigger ? open : openProp}
        onClose={onClose}
      >
        <DialogTitle {...{ ...(titleProps || {}), sx: { fontSize: '16px', ...(titleProps?.sx || {}) } }}>
          { title }
          { showCloseIcon && (
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
              { CloseIcon }
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent {...(contentProps || {})}>
          {children}
        </DialogContent>
        { showActions && (
          <DialogActions {...(actionsProps || {})}>
            { !!extraActions && (extraActions)}
            { showCancel && (
              <Button
                variant='outlined'
                color='secondary'
                {...(cancelProps || {})}
                onClick={onCancel}
              >
                { cancelText }
              </Button>
            )}
            { showConfirm && (
              <Button
                variant='contained'
                color='primary'
                {...(confirmProps || {})}
                onClick={onConfirm}
              >
                { confirmText }
              </Button>
            )}
          </DialogActions>
        )}
      </Dialog>
    </>
  );
});

Modal.defaultProps = {
  CloseIcon: <IconX size='24px'/>,
  showCloseIcon: true,
  showCancel: true,
  cancelText: '取消',
  showConfirm: true,
  confirmText: '确认',
  showActions: true,
};

export default Modal;
