import React from 'react';
import { useCreation, useMemoizedFn, useSafeState } from 'ahooks';
import { Box, Button, ClickAwayListener, DialogActions, DialogContent, Fade, Link, Paper, useTheme } from '@mui/material';
import type { PopperProps, ButtonProps, PaperProps, LinkProps } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

import { Arrow } from './Arrow';
import { Popper } from './Popper';

export interface PopConfirmProps extends Omit<PopperProps, 'open' | 'title'> {
  arrow?: boolean,
  timeout?: number,
  preventOverflow?: boolean,
  triggerProps?: Omit<LinkProps, 'onClick'>,
  rootProps?: PaperProps,
  disabled?: boolean,
  closeOnClickAway?: boolean,
  showConfirm?: boolean,
  confirmText?: React.ReactNode | React.ReactNode[],
  confirmProps?: Omit<ButtonProps, 'onClick'>,
  onConfirm?: (() => any) | (()=> Promise<any>),
  showCancel?: boolean,
  cancelText?: React.ReactNode | React.ReactNode[],
  cancelProps?: Omit<ButtonProps, 'onClick'>,
  onCancel?: (() => any) | (()=> Promise<any>),
  showTitle?: boolean,
  title?: React.ReactNode | React.ReactNode[],
  showIcon?: boolean,
  icon?: React.ReactNode,
  extraContent?: React.ReactNode | React.ReactNode[],
  width?: number,
  maxWidth?: number,
}

export const PopConfirm = React.forwardRef<any, React.PropsWithChildren<PopConfirmProps>>((props, ref) => {
  const { children, triggerProps, disabled, rootProps,
    onCancel, onConfirm, arrow, closeOnClickAway, placement, timeout, modifiers: modifiersProp, sx,
    maxWidth, width, preventOverflow,
    confirmProps, confirmText, showConfirm,
    cancelProps, cancelText, showCancel,
    showIcon, icon, showTitle, title, extraContent,
    ...restProps } = props;
  const theme = useTheme();
  const [ anchorEl, setAnchorEl ] = useSafeState(null);
  const [ open, setOpen ] = useSafeState(false);
  const [ arrowRef, setArrowRef ] = useSafeState(null);
  const [ loading, setLoading ] = useSafeState(false);
  const handleClose = useMemoizedFn(() => {
    if (open) {
      setOpen(false);
    }
  });
  const handleClick = useMemoizedFn((e) => {
    setAnchorEl(e.currentTarget);
    if (disabled) { return; }
    if (closeOnClickAway && open) {
      return;
    }
    setOpen((s) => !s);
  });
  const onCancelClick = useMemoizedFn(() => {
    onCancel?.();
    setOpen(false);
  });
  const onConfirmClick = useMemoizedFn(async () => {
    setLoading(true);
    const res = await onConfirm?.();
    setLoading(false);
    if (res !== false) {
      handleClose();
    }
  });
  const onClickAway = useMemoizedFn(() => {
    if (closeOnClickAway) {
      handleClose();
    }
  });
  const paperProps = useCreation(() => {
    const { sx, ...rest } = (rootProps || {});
    const defaultProps = {
      elevation: 1,
      sx: {
        maxWidth: maxWidth || 500,
        ...(sx || {}),
        width,
      },
      ...rest,
    };
    return defaultProps;
  }, [ width, maxWidth, rootProps ]);
  return (
    <>
      <Popper ref={ref} open={open} anchorEl={anchorEl} sx={{ zIndex: theme.zIndex.modal, ...(sx || {}) }} {...restProps}
        placement={placement}
        // @ts-ignore
        arrow={arrow}
        modifiers={!modifiersProp ? [
          { name: 'flip',
            enabled: false,
            options: { altBoundary: true, rootBoundary: 'document', padding: 8 },
          },
          { name: 'preventOverflow',
            enabled: !!preventOverflow,
            options: { altAxis: false, altBoundary: true, tether: false, rootBoundary: 'document', padding: 8 },
          },
          { name: 'arrow',
            enabled: true,
            options: { element: arrowRef },
          },
        ] : modifiersProp.concat({
          name: 'arrow',
          enabled: true,
          options: { element: arrowRef },
        },
        )}
      >
        { ({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={timeout}>
            <div>
              { arrow && (
                // @ts-ignore
                <Arrow ref={setArrowRef} className='MuiPopper-arrow' />
              )}
              <Paper
                {...paperProps}
              >
                <ClickAwayListener onClickAway={onClickAway}>
                  <div>
                    <DialogContent sx={{ pb: 0 }}>
                      <Box>
                        <Box display='inline-flex' >
                          { showIcon && (
                            <span style={{ marginRight: '4px' }}>
                              { icon }
                            </span>
                          )}
                          { showTitle && (
                            <span style={{ fontSize: '0.8rem', lineHeight: '1.25rem' }} >
                              {title}
                            </span>
                          )}
                        </Box>
                      </Box>
                      <Box>
                        { extraContent }
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      { showCancel && (
                        <Button
                          {...(cancelProps || {})}
                          onClick={onCancelClick}
                        >
                          { cancelText }
                        </Button>
                      )}
                      { showConfirm && (
                        <Button
                          disabled={loading}
                          {...(confirmProps || {})}
                          onClick={onConfirmClick}
                        >
                          { confirmText }
                        </Button>
                      )}
                    </DialogActions>
                  </div>
                </ClickAwayListener>
              </Paper>
            </div>
          </Fade>
        )}
      </Popper>
      <Link onClick={handleClick} {...{ underline: 'none', sx: { cursor: 'pointer' }, ...(triggerProps || {}) }}>
        {children}
      </Link>
    </>
  );
});
PopConfirm.defaultProps = {
  closeOnClickAway: true,
  preventOverflow: true,
  arrow: true,
  transition: true,
  placement: 'top',
  timeout: 350,
  showCancel: true,
  showConfirm: true,
  showIcon: true,
  showTitle: true,
  icon: <InfoIcon color='warning' sx={{ fontSize: '1.25rem' }} />,
  cancelText: '取消',
  confirmText: '确认',
};

PopConfirm.displayName = 'iimm.Mui.PopConfirm';
