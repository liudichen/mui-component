/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 18:55:56
 * @LastEditTime: 2022-05-09 20:17:34
 */
import PropTypes from 'prop-types';
import React from 'react';

const TypeColor = {
  success: '#52c41a',
  success2: '#13c2c2',
  warning: '#faad14',
  error: '#ff4d4f',
  process: '#1890ff',
  default: '#d9d9d9',
};
const StatusType = {
  批准: TypeColor.success,
  关闭: TypeColor.success,
  完成: TypeColor.success,
  有效: TypeColor.success,
  已移交: TypeColor.success2,
  已签收: TypeColor.success,
  关联关闭: TypeColor.success,
  未签收: TypeColor.warning,
  移交: TypeColor.success2,
  修改: TypeColor.warning,
  撤回: TypeColor.warning,
  退回: TypeColor.error,
  无效: TypeColor.error,
  禁用: TypeColor.error,
  '挂起(禁用)': TypeColor.error,
  提交: TypeColor.process,
  编辑: TypeColor.process,
  审批中: TypeColor.process,
  到达: TypeColor.process,
  废弃: TypeColor.default,
  作废: TypeColor.default,
  封存: TypeColor.default,
  等待: TypeColor.default,
  终止: TypeColor.default,
  确认: TypeColor.process,
};
const getColor = (color, status, type, statusColorConvert, statusTypeConvert) => {
  if (color) { return color; }
  if (status) {
    if (statusColorConvert) {
      return statusColorConvert(status);
    }
    if (statusTypeConvert) {
      return TypeColor[statusTypeConvert(status)] ?? TypeColor.default;
    }
    return StatusType[status] ?? TypeColor.default;
  } else if (type) {
    return StatusType[type] ?? TypeColor.default;
  }
  return TypeColor.default;
};

const StatusRender = (props) => {
  const { color, status, type, statusColorConvert, statusTypeConvert, text, statusTextConvert, textSpanStyle, dotSpanStyle } = props;


  return (
    <span
      style={{
        verticalAlign: 'baseline',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: '6px',
          height: '6px',
          marginRight: '2px',
          verticalAlign: 'middle',
          borderRadius: '50%',
          backgroundColor: getColor(color, status, type, statusColorConvert, statusTypeConvert),
          ...(dotSpanStyle || {}),
        }}
      />
      <span style={textSpanStyle}>
        { text ?? statusTextConvert?.(status) ?? status }
      </span>
    </span>
  );
};


StatusRender.propTypes = {
  color: PropTypes.string,
  status: PropTypes.oneOfType([
    PropTypes.oneOf(Object.keys(StatusType)),
    PropTypes.string,
  ]),
  type: PropTypes.oneOf([ 'success', 'success2', 'warning', 'error', 'process', 'default' ]),
  text: PropTypes.node,
  statusColorConvert: PropTypes.func,
  statusTypeConvert: PropTypes.func,
  statusTextConvert: PropTypes.func,
  textSpanStyle: PropTypes.object,
  dotSpanStyle: PropTypes.object,
};

export default StatusRender;
