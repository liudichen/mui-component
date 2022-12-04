import { Paper } from '@mui/material';
import Draggable from 'react-draggable';

export const DraggablePaper = (props) => {
  const { draggableProps, ...restProps } = props;
  return (
    <Draggable
      {...draggableProps }
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
