/*
 * @Description :仿照antd的显示字段状态的组件
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-05-09 18:55:46
 * @LastEditTime: 2022-05-09 19:48:13
 */
import React from 'react';

type shownType = 'success' | 'success2' | 'warning' | 'error' | 'process' | 'default';

export interface StatusRenderProps {
  color?: string,
  status?: string,
  type?: shownType,
  text?: React.ReactNode,
  statusColorConvert?: (status: string) => string,
  statusTypeConvert?: (status: string) => shownType,
  statusTextConvert?: (status: string) => React.ReactNode,
  textSpanStyle?: object,
  dotSpanStyle?: object,
}

declare const StatusRender: React.FunctionComponent<StatusRenderProps>;

export default StatusRender;
