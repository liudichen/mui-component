import { Paper, type PaperProps } from "@mui/material";
import Draggable, { type DraggableProps } from "react-draggable";

export const DraggablePaperRender = (draggalbeOptions: Partial<DraggableProps>) => {
  return (props: PaperProps) => (
    <Draggable {...(draggalbeOptions || {})}>
      <Paper {...props} />
    </Draggable>
  );
};
