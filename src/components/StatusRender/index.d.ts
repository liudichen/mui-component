import React from 'react';

type shownType = 'success' | 'success2' | 'warning' | 'error' | 'process' | 'process0' | 'default' | 'edit';

export interface IStatusConvertRelateProps {
  /** 指定状态颜色 */
  statusColorConvert?: (status: string) => string,
  /** 指定状态-> success等显示态的对应关系 */
  statusTypeConvert?: (status: string) => shownType,
  /** 指定状态对应的显示文本 */
  statusTextConvert?: (status: string) => React.ReactNode,
  /** 状态转换（原始状态转化为内置的状态） */
  statusConvert?: (status: string) => string,
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

/** 类似于antd的状态显示 */
export declare const StatusRender: React.FC<StatusRenderProps>;

