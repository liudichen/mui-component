/*
 * @Description :仿照antd的显示字段状态的组件
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 18:55:46
 * @LastEditTime: 2022-10-09 11:46:15
 */
import React from 'react';

type shownType = 'success' | 'success2' | 'warning' | 'error' | 'process' | 'default';

export interface StatusRenderProps {
  color?: string,
  status?: string,
  type?: shownType,
  text?: React.ReactNode,
  /** 指定状态颜色 */
  statusColorConvert?: (status: string) => string,
  /** 指定状态-> success等显示态的对应关系 */
  statusTypeConvert?: (status: string) => shownType,
  /** 指定状态对应的显示文本 */
  statusTextConvert?: (status: string) => React.ReactNode,
  /** 状态转换（原始状态转化为内置的状态） */
  statusConvert?: (status: string) => string,
  textSpanStyle?: object,
  dotSpanStyle?: object,
}

declare const StatusRender: React.FunctionComponent<StatusRenderProps>;

export default StatusRender;
