import React from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link, useTheme, Paper, useMediaQuery, Tooltip } from '@mui/material';
import Draggable from 'react-draggable';
import classNames from 'classnames';
import { IconCircleX } from '@tabler/icons';

import { useId } from '../../hooks';

const Modal = (props) => {
  const {
    trigger, triggerProps,
    onConfirm: onConfirmProp, onCancel: onCancelProp,
    cancelText, confirmText, showConfirm, showCancel, cancelProps, confirmProps, extraActions,
    showCloseIcon, closeIconButtonProps, CloseIcon,
    showActions,
    title, titleProps, titleBoxProps,
    contentProps, actionsProps, open: openProp, onClose: onCloseProp,
    children, disabled, content,
    PaperComponent,
    fullScreen, draggable, responsive, breakpoint,
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
          }}
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
        { (!!title || showCloseIcon) && (
          <DialogTitle
            display='flex'
            alignItems='start'
            bgcolor='#f5f5f5'
            {...(titleProps || {})}
            className={classNames(titleId, titleProps?.className)}
            sx={{ padding: 0, ...(titleProps?.sx || {}) }}
          >
            <Box flex={1} fontSize='16px' height='100%' alignSelf='center' marginLeft={1.5} marginY={0.5} {...(titleBoxProps || {})}>
              {title}
            </Box>
            {showCloseIcon && (
              <Tooltip arrow placement='top' title='关闭'>
                <IconButton
                  sx={{ px: 0.25, py: 0.5 }}
                  {...(closeIconButtonProps || {})}
                  aria-label='close'
                  onClick={onClose}
                >
                  {CloseIcon || <IconCircleX size='1.5em' stroke='1.5px' color='#8c8c8c'/>}
                </IconButton>
              </Tooltip>
            )}
          </DialogTitle>
        )}
        <DialogContent {...(contentProps || {})}>
          {content ?? children}
        </DialogContent>
        {showActions && (
          <DialogActions {...(actionsProps || {})}>
            {extraActions}
            {showCancel && (
              <Button
                variant='outlined'
                color='secondary'
                children={cancelText}
                {...(cancelProps || {})}
                onClick={onCancel}
              />
            )}
            {showConfirm && (
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
