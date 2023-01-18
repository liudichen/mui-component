import React from 'react';

const TypeColor = {
  success: '#52c41a',
  success2: '#13c2c2',
  warning: '#faad14',
  error: '#ff4d4f',
  process0: '#69c0ff',
  process: '#1890ff',
  process2: '#0050b3',
  default: '#d9d9d9',
  edit: '#e6f7ff',
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
  已作废: TypeColor.default,
  作废: TypeColor.default,
  封存: TypeColor.default,
  等待: TypeColor.default,
  终止: TypeColor.default,
  确认: TypeColor.process,
};
const getColor = (color?: string, rawStatus?: string, type?: shownType, statusColorConvert?: IStatusConvertRelateProps['statusColorConvert'], statusTypeConvert?: IStatusConvertRelateProps['statusTypeConvert'], statusConvert?: IStatusConvertRelateProps['statusConvert']) => {
  if (color) {
    return color;
  }
  const status = statusConvert ? statusConvert(rawStatus) : rawStatus;
  if (status) {
    if (statusColorConvert) {
      return statusColorConvert(status);
    }
    if (statusTypeConvert) {
      return TypeColor[statusTypeConvert(status)] ?? TypeColor.default;
    }
    // @ts-ignore
    return StatusType?.[status] || TypeColor.default;
  } else if (type) {
    return TypeColor[type] ?? TypeColor.default;
  }
  return TypeColor.default;
};

const getText = (text?: React.ReactNode, rawStatus?: string, statusConvert?: IStatusConvertRelateProps['statusConvert'], statusTextConvert?: IStatusConvertRelateProps['statusTextConvert']) => {
  if (text) {
    return text;
  }
  const status = statusConvert ? statusConvert(rawStatus) : rawStatus;
  return statusTextConvert?.(status) ?? (status || null);
};

export const StatusRender = (props: StatusRenderProps) => {
  const {
    color,
    status,
    type,
    statusColorConvert,
    statusTypeConvert,
    text,
    statusTextConvert,
    textSpanStyle,
    dotSpanStyle,
    statusConvert,
    noStatusText = '-',
  } = props;
  const txt = getText(text, status, statusConvert, statusTextConvert);
  return txt ? (
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
          backgroundColor: getColor(
            color,
            status,
            type,
            statusColorConvert,
            statusTypeConvert,
            statusConvert,
          ),
          ...(dotSpanStyle || {}),
        }}
      />
      <span style={textSpanStyle}>{txt}</span>
    </span>
  ) : <span>{noStatusText}</span>;
};

StatusRender.displayName = 'iimm.Mui.StatusRender';

type shownType = 'success' | 'success2' | 'warning' | 'error' | 'process' | 'process0' | 'default' | 'edit';

export interface IStatusConvertRelateProps {
  /** 指定状态颜色 */
  statusColorConvert?: (status?: string) => string,
  /** 指定状态-> success等显示态的对应关系 */
  statusTypeConvert?: (status?: string) => shownType,
  /** 指定状态对应的显示文本 */
  statusTextConvert?: (status?: string) => React.ReactNode,
  /** 状态转换（原始状态转化为内置的状态） */
  statusConvert?: (status?: string) => string,
}

export interface StatusRenderProps extends IStatusConvertRelateProps {
  color?: string,
  status?: string,
  type?: shownType,
  text?: React.ReactNode,
  /** 状态文本的span的style */
  textSpanStyle?: React.CSSProperties,
  /** 状态文本前的点的span的style */
  dotSpanStyle?: React.CSSProperties,
  /** 当不存在status文本时显示的内容
   * @default '-''
   */
  noStatusText?: React.ReactNode,
}
