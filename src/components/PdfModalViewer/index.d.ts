import React from 'react';
import { DocumentProps } from '@types/react-pdf';

import { ModalProps } from '../Modal';

type IPdf = string | File | Blob | ArrayBuffer;

export declare const pdfjs: {
  GlobalWorkerOptions? : {
    workerSrc?: string,
  }
};

export interface PdfModalViewerProps extends Omit<ModalProps, 'content' | 'withDialogContentWrapper'> {
  /** 必要，传入的文件,支持url/base64/File/ArrayBuffer */
  file: string | File | Blob | ArrayBuffer,

  /** 手动指定的文件名(用于标题展示和下载) */
  fileName?: string,

  /** 获取内部setOpen操作方法的ref */
  setOpenRef?: React.MutableRefObject<{setOpen: (open: boolean) => void}>,
  /** 传递给react-pdf的Document组件的props */
  documentProps?: DocumentProps,
  /** 显示顶部工具条?
   * @default true
   */
  showToolbar?: boolean,
  /** 传递给toolbar顶层的className(拥有1个默认cls:pdf-viewer-toolbar) */
  toolbarClassName?: string,
  /** 显示控制全屏的按钮?
   * @default true
   */
  showFullScreen?: boolean,
  /** 初始fullScreen状态 */
  defaultFullScreen?: boolean,
  /** 响应式全屏?(低于断点自动全屏，高于断点自动退出全屏)
   * @default true
  */
  responsive?: boolean,
  /** 响应式断点
   * @default 'sm'
   */
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number,

  /** 显示旋转页面按钮?
   * @default true
   */
  showRotate?: boolean,
  /** 默认旋转角度
   * @default 0
   */
  defaulRotate?: number,
  /** 角度变化时触发 */
  onRotateChange?: (rawRotate: number, newRotate: number) => void,

  /** 显示当前缩放比例?
   * @default true
   */
  showScale?: boolean,
  /** 默认缩放比例
   * @default 1
   */
  defaultScale?: number,
  /** 最大放大比例
   * @default 10
   */
  maxScale?: number,
  /** 最小缩小比例
   * @default 1
   */
  minScale?: number,
  /** 显示旋转角度的步进按钮?
   * @default true
   */
  showScaleStep?: boolean,
  /** 缩放比例时触发 */
  onScaleChange?: (rawScale: number, newScale: number) => void,

  /** 显示当前页码?
   * @default true,
   */
  showPagination?: boolean,
  /** 初始页码 */
  defaultPageNumber?: number,
  /** 显示跳转到首页按钮?
   * @default true
   */
  showFirstPage?: boolean,
  /** 显示跳转到尾页按钮
   * @default true
   */
  showLastPage?: boolean,
  /** 显示上一页/下一页按钮?
   * @default true
   */
  showPageStep?: boolean,
  /** 页码变动时触发 */
  onPageNumberChange?: (rawPageNumber: number, newPageNubmer: number) => void,
  /** 滚动页面时更新页码显示?
   * @default true
   */
  updatePageOnScroll?: boolean,

  /** 显示重置设置按钮?
   * @default true
   */
  showReset?: boolean,
  /** 点击重置触发 */
  onReset?: () => void,

  /** 显示重载文件按钮?
   * @default true
   */
  showReload?: boolean,
  /** 重载文件后触发 */
  onReload?: () => void,
  /** 当该值变化时会触发文件重载(因为只要获取了文件，默认不会再触发重载了,此prop为了实现外部自动触发文件重载)
   * @default 0
  */
  shouldReload?: any,

  /** 显示下载按钮?
   * @default true
   */
  showDownload?: boolean,
  /** 下载成功时触发 */
  onDownloadSuccess?: (pdf: IPdf, fileName?: string) => void,
  /** 现在失败时触发 */
  onDownloadFail?: (pdf: IPdf, fileName?: string) => void,

  /** React-pdf的Document加载成功后触发，可以用来处理记录文件已阅等操作 */
  onPdfLoadSuccess?: (pdf: IPdf, fileName?: string) => void,
  /** 从file-prop获取pdf资源错误时触发 */
  onPdfFetchError?: (file: IPdf | (() => IPdf) | (() => Promise<IPdf>), fileName?: string) => void,
}

/** 使用前必须自定义worker
 * @example
 * ```
 * // vite:
import { pdfjs } from 'mui-component'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js?url';
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
 * ```
 */
export declare const PdfModalViewer: React.FC<PdfModalViewerProps>;
