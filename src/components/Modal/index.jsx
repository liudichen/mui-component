import React from 'react';
import { useControllableValue, useMemoizedFn } from 'ahooks';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link, useTheme, useMediaQuery, Tooltip } from '@mui/material';
import classNames from 'classnames';
import { IconCircleX } from '@tabler/icons';

import { DraggablePaper } from './DraggablePaper';

export const Modal = (props) => {
  const {
    trigger, triggerProps,
    onConfirm: onConfirmProp, onCancel: onCancelProp,
    cancelText, confirmText, showConfirm, showCancel, cancelProps, confirmProps, extraActions,
    showCloseIcon, closeIconButtonProps, CloseIcon,
    showActions,
    title, titleProps, titleBoxProps,
    contentProps, actionsProps,
    // eslint-disable-next-line no-unused-vars
    open: openProp, onClose: onCloseProp, setOpen: setOpenProp,
    children, disabled, content, withDialogContentWrapper,
    PaperComponent,
    fullScreen: fullScreenProp, draggable: draggableProp, responsive, breakpoint,
    ...restProps
  } = props;
  const theme = useTheme();
  const down = useMediaQuery(theme.breakpoints.down(breakpoint));
  const fullScreen = fullScreenProp ?? (responsive ? down : undefined);
  const draggable = draggableProp && !fullScreen;
  const [ open, setOpen ] = useControllableValue(props, { defaultValue: false, valuePropName: 'open', trigger: 'setOpen' });
  const onClose = useMemoizedFn(async (e, reason) => {
    const res = await onCloseProp?.(e, reason);
    if (res !== false) { setOpen(false); }
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
        fullScreen={fullScreen}
        PaperComponent={PaperComponent ?? (draggable ? DraggablePaper : undefined)}
        open={!!open}
        onClose={onClose}
      >
        {(!!title || showCloseIcon) && (
          <DialogTitle
            display='flex'
            alignItems='start'
            bgcolor='#f5f5f5'
            {...(titleProps || {})}
            className={classNames('dialog-draggable-title', titleProps?.className)}
            sx={{ padding: 0, ...(titleProps?.sx || {}) }}
          >
            <Box
              flex={1} fontSize='16px' height='100%' alignSelf='center' marginLeft={1.5} marginY={0.5}
              {...(titleBoxProps || {})}
              sx={draggable ? ({ cursor: 'move', ...(titleBoxProps?.sx || {}) }) : titleBoxProps?.sx}
            >
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
                  {CloseIcon || <IconCircleX size='1.5em' stroke='1.5px' color='#8c8c8c' />}
                </IconButton>
              </Tooltip>
            )}
          </DialogTitle>
        )}
        {withDialogContentWrapper ? (
          <DialogContent {...(contentProps || {})}>
            {content ?? children}
          </DialogContent>
        ) : (
          content ?? children
        )}
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
  withDialogContentWrapper: true,
};
