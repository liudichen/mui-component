import { ChangeEvent, useRef, type MouseEvent } from "react";
import { useKeyPress, useMemoizedFn, useSafeState } from "ahooks";
import { useId } from "@iimm/react-shared";
import { Button, Card, CardActions, CardContent, IconButton, Popover, TextField } from "@mui/material";
import { IconCornerUpRightDouble } from "@tabler/icons-react";

interface IProps {
  onPageChange: (pageNumberBase1: number) => void;
  total: number;
  color?: any;
  size?: "small" | "medium" | "large";
}

export const JumpTo = ({ total, onPageChange, color, size }: IProps) => {
  const id = useId();
  const ref = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = useSafeState<HTMLButtonElement | null>(null);
  const [value, setValue] = useSafeState<string>("");

  const onClick = useMemoizedFn((e: MouseEvent<HTMLButtonElement>) => {
    setValue("");
    setAnchorEl(e.currentTarget);
  });

  const onClose = useMemoizedFn(() => {
    setValue("");
    setAnchorEl(null);
  });

  const onChange = useMemoizedFn((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value || "");
  });

  const onJump = useMemoizedFn(() => {
    let v = parseInt(`${value || 1}`);
    if (v < 1) {
      v = 1;
    } else if (v > total) {
      v = total || 1;
    }
    onPageChange?.(v);
    onClose();
  });

  const onEnter = useMemoizedFn(() => {
    if (!value) return;
    onJump();
  });

  useKeyPress("enter", onEnter, { target: ref });

  const open = Boolean(anchorEl);
  const popoverId = open ? id : undefined;

  let wh = !size || size === "small" ? 26 : size === "large" ? 40 : 32;

  return (
    <div>
      <IconButton
        onClick={onClick}
        aria-describedby={id}
        title="跳转到指定页"
        size="small"
        color={color || "secondary"}
        sx={{
          borderRadius: "50%",
          borderStyle: "solid",
          borderColor: "rgba(0,0,0,0.2)",
          borderWidth: 1,
          width: wh,
          height: wh,
        }}
      >
        <IconCornerUpRightDouble />
      </IconButton>
      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Card sx={{ px: 0, minWidth: 180, maxWidth: 250 }}>
          <CardContent>
            <TextField
              ref={ref}
              label="输入要跳转的页码"
              size="small"
              placeholder="目标页码"
              variant="standard"
              autoFocus
              type="number"
              fullWidth
              inputProps={{ type: "number", min: 1, max: total || 1 }}
              value={value}
              onChange={onChange}
            />
          </CardContent>
          <CardActions sx={{ py: 0, px: 1, display: "flex", justifyContent: "space-between" }}>
            <Button color="secondary" onClick={onClose}>
              关闭
            </Button>
            <Button disabled={!value} onClick={onJump}>
              跳转!
            </Button>
          </CardActions>
        </Card>
      </Popover>
    </div>
  );
};
