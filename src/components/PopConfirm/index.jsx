/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-11 15:24:22
 * @LastEditTime: 2022-05-12 14:25:10
 */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useCreation, useMemoizedFn } from 'ahooks';
import { Box, Button, ClickAwayListener, DialogActions, DialogContent, Fade, Link, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import { sx } from '../../propTypes';
import Arrow from './Arrow';
import Popper from './Popper';

const PopConfirm = React.forwardRef((props, ref) => {
  const { children, triggerProps, disabled, rootProps,
    onCancel, onConfirm, arrow, closeOnClickAway, placement, timeout, modifiers: modifiersProp,
    maxWidth, width, preventOverflow,
    confirmProps, confirmText, showConfirm,
    cancelProps, cancelText, showCancel,
    showIcon, icon, showTitle, title, extraContent,
    ...restProps } = props;
  const [ anchorEl, setAnchorEl ] = useState(null);
  const [ open, setOpen ] = useState(false);
  const [ arrowRef, setArrowRef ] = useState(null);
  const [ loading, setLoading ] = useState(false);
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
      <Popper ref={ref} open={open} anchorEl={anchorEl} {...restProps}
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

PopConfirm.propTypes = {
  arrow: PropTypes.bool,
  preventOverflow: PropTypes.bool,
  triggerProps: PropTypes.object,
  rootProps: PropTypes.object,

  disabled: PropTypes.bool,
  closeOnClickAway: PropTypes.bool,

  showConfirm: PropTypes.bool,
  confirmText: PropTypes.node,
  confirmProps: PropTypes.object,
  onConfirm: PropTypes.func,
  showCancel: PropTypes.bool,
  cancelText: PropTypes.node,
  cancelProps: PropTypes.object,
  onCancel: PropTypes.func,
  showTitle: PropTypes.bool,
  title: PropTypes.node,
  showIcon: PropTypes.bool,
  icon: PropTypes.node,
  extraContent: PropTypes.node,

  timeout: PropTypes.number,

  disablePortal: PropTypes.bool,
  keepMounted: PropTypes.bool,
  placement: PropTypes.oneOf([ 'auto-end', 'auto-start', 'auto', 'bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top' ]),
  modifiers: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.object,
    effect: PropTypes.func,
    enabled: PropTypes.bool,
    fn: PropTypes.func,
    name: PropTypes.any,
    options: PropTypes.object,
    phase: PropTypes.oneOf([ 'afterMain', 'afterRead', 'afterWrite', 'beforeMain', 'beforeRead', 'beforeWrite', 'main', 'read', 'write' ]),
    requires: PropTypes.arrayOf(PropTypes.string),
    requiresIfExists: PropTypes.arrayOf(PropTypes.string),
  })),
  popperOptions: PropTypes.shape({
    modifiers: PropTypes.array,
    onFirstUpdate: PropTypes.func,
    placement: PropTypes.oneOf([ 'auto-end', 'auto-start', 'auto', 'bottom-end', 'bottom-start', 'bottom', 'left-end', 'left-start', 'left', 'right-end', 'right-start', 'right', 'top-end', 'top-start', 'top' ]),
    strategy: PropTypes.oneOf([ 'absolute', 'fixed' ]),
  }),
  popperRef: PropTypes.object,
  sx,
  transition: PropTypes.bool,
};

export default PopConfirm;

