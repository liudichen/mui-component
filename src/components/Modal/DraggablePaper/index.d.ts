import React from 'react';
import { PaperProps } from '@mui/material';
import { DraggableProps } from 'react-draggable';

export interface DraggablePaperProps extends PaperProps {
  /** react-draggable的Draggable组件的Props
   * @default  {
    handle: '.dialog-draggable-title',
    cancel: '[class*="MuiDialogContent-root"]',
  }
   */
  draggableProps?: Partial<DraggableProps>
}

/** 用于拖拽的Paper组件，默认props用于Modal和ModalForm组件 */
export declare const DraggablePaper: React.FC<React.PropsWithChildren<DraggablePaperProps>>;
