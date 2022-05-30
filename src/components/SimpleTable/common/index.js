/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-30 14:15:51
 * @LastEditTime: 2022-05-30 19:12:51
 */
import { string, node, bool, number, func, oneOf, oneOfType } from 'prop-types';
const columnPropType = {
  field: string,
  title: node,
  renderTitle: func,
  titleAlign: oneOf([ 'center', 'left', 'right' ]),
  type: oneOf([ 'string', 'number', 'date', 'select', 'actions', 'status' ]),
  align: oneOf([ 'center', 'left', 'right' ]),
  renderCell: func,
  getCellProps: func, // ({isHeader,row,rowIndex,field}) => object
  ellipsis: bool,
  width: oneOfType([ number, string ]),
  maxWidth: oneOfType([ number, string ]),
  minWidth: oneOfType([ number, string ]),
  showTooltip: bool,
  valueGetter: func, // ({isHeader,row,rowIndex,field}) => any
};

export {
  columnPropType,
};
