import React from 'react';

export interface NoDataProps {
  /** 外层div的className */
  className?: string,
  /** 外层div的style */
  style?: React.CSSProperties,
  /** 无数据文案，优先级高于children */
  noDataText?: React.ReactNode,
  /** 无数据文案，优先级低于noDataText */
  children?: React.ReactNode,
  /** 传递给svg的props */
  svgProps?: React.HTMLProps,
}

/** 表示没有数据的一个svg图标及自定义文案 */
export declare const NoData: React.FC<NoDataProps>;
