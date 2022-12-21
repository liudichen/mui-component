import React from 'react';
import { Box, Fab, useScrollTrigger, Zoom } from '@mui/material';
import type { SxProps } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export interface ScrollTopTopProps {
  /** 锚点元素的 id,如果不设置则默认回到页头 */
  anchorId?: string,
  window?: (() => Node) | (() => Window),
  /** 传递给外层Box的
   * @default {position:'fixed',bottom:'70px',right:'16px'}
  */
  sx?: SxProps,
  /** 滚动多少举例触发显示 */
  threshold?: number,
  /** 内部的内容
   * @default
   * ```
    <Fab
      color='secondary'
      size='small'
      aria-label="scroll back to top"
    >
      <KeyboardArrowUpIcon />
    </Fab>
   * ```
   */
  content?: React.ReactNode,
}

/** 回到顶部组件(通过sx属性可以控制位置) */
export const ScrollTopTop = (props: ScrollTopTopProps) => {
  const { sx, anchorId, threshold, content } = props;
  const trigger = useScrollTrigger({
    target: props.window ? props.window() : undefined,
    disableHysteresis: true,
    threshold,
  });

  const handleClick = (e: React.MouseEvent) => {
    if (anchorId) {
      // @ts-ignore
      const anchor = (e.target?.ownerDocument || document).querySelector(`#${anchorId}`);
      if (anchor) {
        anchor.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };
  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role='presentation'
        sx={{
          position: 'fixed',
          bottom: '70px',
          right: '16px',
          ...sx,
        }}
      >
        {content}
      </Box>
    </Zoom>
  );
};

ScrollTopTop.defaultProps = {
  content: (
    <Fab
      color='secondary'
      size='small'
      aria-label="scroll back to top"
    >
      <KeyboardArrowUpIcon />
    </Fab>
  ),
};
