import { Paper, type PaperProps } from '@mui/material';
import Draggable, { type DraggableProps } from 'react-draggable';

export interface DraggablePaperProps extends PaperProps {
  /** react-draggable的Draggable组件的Props
   * @default  {
    handle: '.dialog-draggable-title',
    cancel: '[class*="MuiDialogContent-root"]',
  }
   */
  draggableProps?: Partial<DraggableProps>
}

export const DraggablePaper = (props: DraggablePaperProps) => {
  const { draggableProps, ...restProps } = props;
  return (
    <Draggable
      {...draggableProps}
    >
      <Paper {...restProps} />
    </Draggable>
  );
};

DraggablePaper.defaultProps = {
  draggableProps: {
    handle: '.dialog-draggable-title',
    cancel: '[class*="MuiDialogContent-root"]',
  },
};

DraggablePaper.displayName = 'iimm.Mui.DraggablePaper';
