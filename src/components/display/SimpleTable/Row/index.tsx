import { useCreation, useSafeState } from "ahooks";
import { Collapse, TableCell, TableRow } from "@mui/material";

import { createReactComponent } from "./tabler";
import { Cell } from "./Cell";
import type { SimpleTableColumn } from "../index";

const OpenIcon = createReactComponent("outline", "square-plus", "IconSquarePlus", [
  [
    "path",
    {
      d: "M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
      key: "svg-0",
    },
  ],
  ["path", { d: "M9 12l6 0", key: "svg-1" }],
  ["path", { d: "M12 9l0 6", key: "svg-2" }],
]);

const CloseIcon = createReactComponent("outline", "square-minus", "IconSquarePlus", [
  [
    "path",
    {
      d: "M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z",
      key: "svg-0",
    },
  ],
  ["path", { d: "M9 12l6 0", key: "svg-1" }],
]);

export const Row = (props: any) => {
  const {
    columns,
    rowIndex,
    hideHeader,
    row,
    showExpandColumn,
    expandRowByClick,
    expandColumnWidth,
    expandRowRender,
    expandable,
    isExpandable,
    expandIcon,
    bordered,
    unmountOnExit,
    columnDefaultWidth,
  } = props;
  const [open, setOpen] = useSafeState(false);

  const colSpans = useCreation(() => {
    let cols = columns?.length ?? 0;
    if (showExpandColumn) {
      cols += 1;
    }
    return cols;
  }, [columns?.length, showExpandColumn]);

  return (
    <>
      <TableRow>
        {expandable && showExpandColumn && (
          <TableCell
            align="center"
            width={rowIndex === -1 || (rowIndex === 0 && hideHeader) ? expandColumnWidth : undefined}
            sx={
              bordered
                ? rowIndex === -1 || (rowIndex === 0 && hideHeader)
                  ? {
                      borderTop: "1px solid rgba(224,224,224,1)",
                      borderLeft: "1px solid rgba(224,224,224,1)",
                      borderRight: "1px solid rgba(224,224,224,1)",
                      maxWidth: expandColumnWidth,
                    }
                  : {
                      borderLeft: "1px solid rgba(224,224,224,1)",
                      borderRight: "1px solid rgba(224,224,224,1)",
                      maxWidth: expandColumnWidth,
                    }
                : undefined
            }
          >
            {rowIndex > -1 && !!isExpandable && (
              <span onClick={() => setOpen((s) => !s)} style={{ cursor: "pointer" }}>
                {open
                  ? expandIcon?.[0] ?? <CloseIcon size="1.25rem" />
                  : expandIcon?.[1] ?? <OpenIcon size="1.25rem" />}
              </span>
            )}
          </TableCell>
        )}
        {columns?.map((item: SimpleTableColumn, index: number) => (
          <Cell
            key={item?.field ?? index}
            row={row}
            rowIndex={rowIndex}
            hideHeader={hideHeader}
            bordered={bordered}
            expandRowByClick={isExpandable && expandRowByClick}
            setOpen={setOpen}
            expandIcon={expandIcon}
            columnDefaultWidth={columnDefaultWidth}
            {...item}
          />
        ))}
      </TableRow>
      {isExpandable && rowIndex > -1 && open && (
        <TableRow>
          <TableCell
            colSpan={colSpans}
            sx={{ py: 0 }}
            style={
              bordered
                ? {
                    borderLeft: "1px solid rgba(224,224,224,1)",
                    borderRight: "1px solid rgba(224,224,224,1)",
                  }
                : undefined
            }
          >
            <Collapse in={open} timeout="auto" unmountOnExit={unmountOnExit}>
              {expandRowRender?.(row, rowIndex, open)}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

Row.displayName = "iimm.Mui.SimpleTable.Row";
