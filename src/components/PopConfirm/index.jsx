import React from 'react';
import { useCreation, useMemoizedFn, useSafeState } from 'ahooks';
import { Box, Button, ClickAwayListener, DialogActions, DialogContent, Fade, Link, Paper, useTheme } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import { Arrow } from './Arrow';
import { Popper } from './Popper';

export const PopConfirm = React.forwardRef((props, ref) => {
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
  const onCancelClick = useMemoizedFn((e) => {
    onCancel?.(e);
    setOpen(false);
  });
  const onConfirmClick = useMemoizedFn(async (e) => {
    setLoading(true);
    const res = await onConfirm?.(e);
    setLoading(false);
    if (res !== false) {
      handleClose();
    }
  });
  const onClickAway = useMemoizedFn((e) => {
    if (closeOnClickAway) {
      handleClose();
    }
  });
  const paperProps = useCreation(() => {
    const { sx, ...rest } = (rootProps || {});
    const defaultProps = {
      elevation: 1,
      sx: {
        maxWidth: 500,
      },
      ...rest,
    };
    if (sx) {
      if (typeof sx === 'object' && !Array.isArray(sx)) {
        defaultProps.sx = { ...defaultProps.sx, ...sx };
      } else {
        defaultProps.sx = sx;
      }
    }
    if (width) {
      defaultProps.sx.width = width;
      defaultProps.sx.maxWidth = undefined;
    }
    if (maxWidth) {
      defaultProps.sx.maxWidth = maxWidth;
    }
    return defaultProps;
  }, [ width, maxWidth, rootProps ]);
  return (
    <>
      <Popper ref={ref} open={open} anchorEl={anchorEl} sx={{ zIndex: theme.zIndex.modal, ...(sx || {}) }} {...restProps}
        placement={placement}
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
        }
        )}
      >
        { ({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={timeout}>
            <div>
              { arrow && (
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

