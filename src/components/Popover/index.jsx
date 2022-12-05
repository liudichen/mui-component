import React from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Popover as MuiPopover } from '@mui/material';
import { useId } from '@iimm/shared';

export const Popover = React.forwardRef((props, ref) => {
  const {
    onClose: onCloseProp,
    triggerType, disabled,
    trigger, id: idProp,
    content, children,
    ...restProps
  } = props;
  const [ anchorE1, setAnchorE1 ] = useSafeState(null);
  const id = useId(idProp);
  const handleColse = useMemoizedFn((e) => {
    if (anchorE1 && !disabled) {
      setAnchorE1(null);
      onCloseProp?.();
    }
  });
  const handleOpen = useMemoizedFn((e) => {
    if (!disabled) { setAnchorE1(e.currentTarget); }
  });
  const open = Boolean(anchorE1);
  return (
    <>
      <span
        aria-owns={open ? id : undefined}
        aria-haspopup="true"
        onMouseEnter={triggerType === 'hover' ? handleOpen : undefined }
        onMouseLeave={triggerType === 'hover' ? handleColse : undefined}
        onClick={triggerType === 'click' ? handleOpen : undefined}
        style={{ cursor: 'help' }}
      >
        {trigger}
      </span>
      <MuiPopover
        ref={ref}
        id={id}
        onClose={handleColse}
        anchorEl={anchorE1}
        open={open}
        disableRestoreFocus={triggerType === 'hover'}
        {...restProps}
        sx={{
          ...(restProps?.sx || {}),
          pointerEvents: triggerType === 'hover' ? 'none' : undefined,
        }}
      >
        {content ?? children}
      </MuiPopover>
    </>
  );
});

Popover.defaultProps = {
  anchorOrigin: { vertical: 'top', horizontal: 'center' },
  transformOrigin: { vertical: 'bottom', horizontal: 'center' },
  PaperProps: { sx: { p: 0.5, borderRadius: 2 } },
  triggerType: 'hover',
};
