import { Children, type ReactNode } from 'react';
import { Box } from '@mui/material';
import type { SxProps, BoxProps } from '@mui/material';

const spaceSize = {
  small: 8,
  medium: 16,
  large: 24,
};

type stringSize = 'small' | 'medium' | 'large';
type sizeType = stringSize | number;
type sizeProp = sizeType | [sizeType, sizeType];

export interface SpaceProps extends BoxProps {
  /** 最多接受2个值(横向间距\竖向间距)
   * @example
   * ```
   * size=8
   * size='small'
   * size=[8,'large']
   * size=[16,24]
   * size=['small','medium']
   * ```
  */
  size?: sizeProp;
  /** 子元素排列方向 */
  direction?: 'row' | 'column';
  split?: ReactNode;
  /**
   * sx add to root Box
   * @default {justifyContent:'center'}
   */
  sx?: SxProps,
}

export const Space = (props: SpaceProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { size, direction, children, flexDirection, split, ...restProps } = props;
  if (children === null || children === undefined) {
    return null;
  }
  const Size = Array.isArray(size) ? size : [ size, size ];
  const rowSpace = typeof Size[0] === 'number' ? Size[0] : spaceSize[Size[0] || 'small'];
  const columnSpace = typeof Size[1] === 'number' ? Size[1] : spaceSize[Size[1] || 'small'];
  return (
    <Box
      flexDirection={direction}
      {...restProps}
    >
      {Children.map(children, (child, index) => {
        if (!child) {
          return null;
        }
        let style = {};
        if (direction === 'column') {
          if (index < Children.count(children) - 1) {
            style = { marginBottom: columnSpace / (split ? 2 : 1) };
          }
        } else {
          if (index > 0) {
            style = { marginLeft: rowSpace / (split ? 2 : 1) };
          }
        }
        return (
          <>
            <div style={style}>
              {child}
            </div>
            {index < Children.count(children) - 1 && !!split && (
              <span style={style}>
                {split}
              </span>
            )}
          </>
        );
      })}
    </Box>
  );
};

Space.defaultProps = {
  size: 'small',
  direction: 'row',
  alignItems: 'center',
  display: 'flex',
  sx: { justifyContent: 'center' },
};

Space.displayName = 'iimm.Mui.Space';
