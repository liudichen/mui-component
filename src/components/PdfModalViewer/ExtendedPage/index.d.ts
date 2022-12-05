import React from 'react';
import { PageProps } from 'react-pdf';

export interface ExtendedPageProps extends PageProps {
  /** 存储各页可见比例的ref */
  inViewRef?: React.MutableRefObject<{[key: string]: number}>,
  /** 包裹所有页的外层容器（DialogContent） */
  rootRef?: React.MutableRefObject<Element>,
  handlePageChange?: (num: number | string) => void,
  /** 翻页时更新页码?  */
  updatePageOnScroll?: boolean,
}

export declare const ExtendedPage: React.FC<ExtendedPageProps>;
