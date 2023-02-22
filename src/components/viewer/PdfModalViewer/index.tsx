import React, { useEffect, useRef, useImperativeHandle } from 'react';
import { useControllableValue, useMemoizedFn, useSafeState } from 'ahooks';
import { Box, DialogContent, IconButton, Tooltip, useTheme, useMediaQuery } from '@mui/material';
import { Document, pdfjs } from 'react-pdf';
import { FirstPage, LastPage, NavigateBefore, NavigateNext, Rotate90DegreesCcwOutlined, Rotate90DegreesCwTwoTone, CloudDownloadOutlined, RestartAlt, ZoomInMapOutlined, ZoomOutMapOutlined, ZoomInOutlined, ZoomOutOutlined, Cached } from '@mui/icons-material';
import { useGlobalId, generateFileDownload, scrollToElement } from '@iimm/shared';
import classNames from 'classnames';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import 'react-pdf/dist/esm/Page/TextLayer.css';
import type { DocumentProps } from 'react-pdf';

import { Modal } from '../../feedback';
import type { ModalProps } from '../../feedback';
import { NoData } from '../../display';
import { ExtendedPage } from './ExtendedPage';
import { JumpToPage } from './JumpToPage';
import './index.scss';

type IPdf = string | File | Blob | ArrayBuffer;

export interface PdfModalViewerProps extends ModalProps {
  /** 必要，传入的文件,支持url/base64/File/ArrayBuffer */
  file: IPdf | (() => IPdf) | (() => Promise<IPdf>),

  /** 手动指定的文件名(用于标题展示和下载) */
  fileName?: string,

  /** 全屏（仅初始值有效,改变不会更新,应由内部工具栏控制）?  */
  fullScreen?: boolean,

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
  onDownloadSuccess?: (pdf: IPdf, fileName?: string) => void | Promise<void>,
  /** 现在失败时触发 */
  onDownloadFail?: (pdf: IPdf, fileName?: string) => void | Promise<void>,
  /** 点击下载开始时触发,可以处理一些消息提醒之类的(如果返回值是false则不会开始下载) */
  onDownloadStart?: (pdf: IPdf, fileName?: string) => void | boolean,

  /** React-pdf的Document加载成功后触发，可以用来处理记录文件已阅等操作 */
  onPdfLoadSuccess?: (pdf: IPdf, fileName?: string) => void,
  /** 从file-prop获取pdf资源错误时触发 */
  onPdfFetchError?: (file: IPdf | (() => IPdf) | (() => Promise<IPdf>), fileName?: string) => void,

  defaultRotate?: number,
}

export { pdfjs };

/** 使用前必须自定义worker
 * @example
 * ```
 * // vite:
import { pdfjs } from 'mui-component'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js?url';
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;
 * ```
 */
export const PdfModalViewer = (props: PdfModalViewerProps) => {
  const { file, fileName: fileNameProp, trigger, title,
    showToolbar, toolbarClassName,
    showFullScreen, defaultFullScreen: fullScreenProp, responsive, breakpoint = 'sm', fullWidth,
    showRotate, onRotateChange, defaultRotate,
    showScale, onScaleChange, maxScale = 10, minScale = 0.1, defaultScale, showScaleStep,
    showReset, onReset,
    showReload, onReload, shouldReload,
    showDownload, onDownloadSuccess, onDownloadFail, onDownloadStart,
    defaultPageNumber, showPagination, showFirstPage, showLastPage, showPageStep, updatePageOnScroll, onPageNumberChange, onPdfLoadSuccess, onPdfFetchError,
    documentProps, contentProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    open: openProp, setOpen: setOpenProp, setOpenRef,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    content, children, withDialogContentWrapper,
    ...restProps
  } = props;
  const theme = useTheme();
  const inViewRef = useRef({});
  const contentRef = useRef();
  const shouldReloadRef = useRef(0);
  const id = useGlobalId();
  const [ key, setKey ] = useSafeState<number>(0);
  const [ open, setOpen ] = useControllableValue(props, { defaultValue: false, valuePropName: 'open', trigger: 'setOpen' });
  const [ fetchLoading, setFetchLoading ] = useSafeState<boolean>(false);
  const [ pdf, setPdf ] = useSafeState<IPdf>();
  const [ fileName, setFileName ] = useSafeState<string>(fileNameProp || '');
  const [ numPages, setNumPages ] = useSafeState<number>();
  const [ pageNumber, setPageNumber ] = useSafeState<number>();
  const [ searchText, setSearchText ] = useSafeState('');
  const [ fullScreen, setFullScreen ] = useSafeState(fullScreenProp);
  const [ rotate, setRotate ] = useSafeState(defaultRotate || 0);
  const [ scale, setScale ] = useSafeState(defaultScale || 1);
  useImperativeHandle(setOpenRef, () => ({ setOpen }), [ setOpen ]);
  const down = useMediaQuery(theme.breakpoints.down(breakpoint));
  const handleResponsive = useMemoizedFn((down) => {
    if (!responsive) return;
    if (down && !fullScreen) {
      setFullScreen(true);
    } else if (!down && fullScreen) {
      setFullScreen(false);
    }
  });
  useEffect(() => { handleResponsive(down); }, [ down ]);
  const handleRotate = useMemoizedFn((direction) => {
    let newRotate = rotate;
    if (direction === 'reset') {
      newRotate = 0;
    } else if (direction === 'right') {
      newRotate = newRotate + 90;
    } else {
      newRotate = newRotate - 90;
    }
    if (newRotate >= 360) {
      newRotate = newRotate - 360;
    } else if (newRotate < 0) {
      newRotate = newRotate + 360;
    }
    if (newRotate !== rotate) {
      setRotate(newRotate);
      onRotateChange?.(rotate, newRotate);
    }
  });
  const handleReset = useMemoizedFn((e, manual = true) => {
    handleRotate('reset');
    if (fullScreen !== (fullScreenProp || false)) {
      setFullScreen(fullScreenProp || false);
    }
    if (scale !== (defaultScale || 1)) {
      setScale(defaultScale || 1);
    }
    if (searchText) { setSearchText(''); }
    if (rotate !== (defaultRotate || 0)) { setRotate(defaultRotate || 0); }
    if (manual) onReset?.();
  });
  const fetchPdf = useMemoizedFn(async (manual = false) => {
    if (!open) return;
    if (!manual && pdf && file && shouldReloadRef.current === shouldReload) return;
    setFetchLoading(true);
    handleReset(null, false);
    inViewRef.current = {};
    if (fileName) setFileName('');
    if (numPages) setNumPages(undefined);
    if (pageNumber) setPageNumber(undefined);
    let pdfFile = null;
    let pdfName: string = fileNameProp || '';
    try {
      if (typeof file === 'function') {
        // @ts-ignore
        const res = await file();
        if (res) {
          pdfFile = res;
        } else {
          throw new Error('未获取到pdf文件');
        }
      } else {
        pdfFile = file;
      }
      if (!pdfName) {
        if (typeof pdfFile === 'string' && !pdfFile.startsWith('data') && pdfFile.includes('/')) {
          pdfName = pdfFile.slice(pdfFile.lastIndexOf('/') + 1).split(/[?#]/)[0];
        } else if ((pdfFile instanceof File || pdfFile instanceof Blob) && pdfFile?.name) {
          pdfName = pdfFile.name;
        }
      }
      setKey((s) => s + 1);
      setPdf(pdfFile);
      setFileName(pdfName);
      shouldReloadRef.current = shouldReload;
    } catch (error) {
      console.log('fetchPdfError', error);
      onPdfFetchError?.(file, pdfName);
    }
    setFetchLoading(false);
    onReload?.();
  });
  useEffect(() => { if (open) { fetchPdf(); } }, [ file, open, shouldReload ]);
  const onLoadSuccess = useMemoizedFn((pdfInfo) => {
    const { numPages } = pdfInfo;
    setNumPages(numPages);
    setPageNumber((defaultPageNumber && defaultPageNumber <= numPages) ? defaultPageNumber : 1);
    // @ts-ignore
    onPdfLoadSuccess?.(pdf, fileName);
    if (documentProps?.onLoadSuccess) {
      documentProps.onLoadSuccess?.(pdfInfo);
    }
  });
  const highlightPattern = useMemoizedFn((text, searchText) => {
    return searchText
      ? text.replace(new RegExp(searchText, 'g'), `<mark>${searchText}</mark>`)
      : text;
  });
  const customTextRenderer = useMemoizedFn((textItem) => highlightPattern(textItem.str, searchText));
  const handlePageChange = useMemoizedFn((num, scrollTo = true) => {
    if (!numPages || !pageNumber) return;
    const rawPageNumber = pageNumber;
    let newPageNumber = pageNumber;
    if (num === 'previous') {
      newPageNumber += -1;
    } else if (num === 'next') {
      newPageNumber += 1;
    } else {
      newPageNumber = num;
    }
    if (newPageNumber < 1) newPageNumber = 1;
    if (newPageNumber > numPages) newPageNumber = numPages;
    if (newPageNumber !== pageNumber) {
      if (scrollTo) {
        const query = document.querySelector(`.${id}-${newPageNumber}`);
        scrollToElement(query as Element);
      }
      setPageNumber(newPageNumber);
      onPageNumberChange?.(rawPageNumber, newPageNumber);
    }
  });
  const handleScale = useMemoizedFn((direction) => {
    const rawScale = Math.round(scale * 100);
    let newScale = rawScale;
    if (direction === 'out') {
      if (newScale < 101) {
        newScale = newScale + 10;
      } else if (newScale < 201) {
        newScale = newScale + 20;
      } else if (newScale < 301) {
        newScale = newScale + 30;
      } else if (newScale < 401) {
        newScale = newScale + 40;
      } else {
        newScale = newScale + 50;
      }
    } else if (direction === 'in') {
      if (newScale > 441) {
        newScale = newScale - 50;
      } else if (newScale > 331) {
        newScale = newScale - 40;
      } else if (newScale > 221) {
        newScale = newScale - 30;
      } else if (newScale > 111) {
        newScale = newScale - 20;
      } else {
        newScale = newScale - 10;
      }
    } else if (direction === 'auto') {
      // 暂不准备处理自适应宽度
    } else {
      newScale = direction;
    }
    const min = Math.round(minScale * 100 || 10);
    const max = Math.round(maxScale * 100 || 1000);
    if (newScale <= min) { newScale = min; }
    if (newScale >= max) { newScale = max; }
    if (newScale !== rawScale) {
      setScale(newScale / 100);
      onScaleChange?.(rawScale / 100, newScale / 100);
    }
  });
  return (
    <Modal
      open={open}
      fullWidth={fullWidth}
      fullScreen={fullScreen}
      setOpen={setOpen}
      title={title ?? `文件查看:${fileName || ''}`}
      trigger={trigger}
      withDialogContentWrapper={false}
      responsive={false}
      PaperProps={{ className: classNames({ 'pdf-viewer-modal-paper': !fullScreen }) }}
      {...restProps}
    >
      {showToolbar && !fetchLoading && (
        <DialogContent className={classNames('pdf-viewer-toolbar', toolbarClassName)}>
          {showFirstPage && !down && !!numPages && (
            <Tooltip arrow placement='top' title='跳转到首页'>
              <IconButton
                size='small' color='primary'
                onClick={() => handlePageChange(1)}
              >
                <FirstPage />
              </IconButton>
            </Tooltip>
          )}
          {showPageStep && !!numPages && (
            <Tooltip arrow placement='top' title='上一页'>
              <IconButton
                size='small' color='primary'
                onClick={() => handlePageChange('previous')}
              >
                <NavigateBefore />
              </IconButton>
            </Tooltip>
          )}
          {showPagination && !!numPages && (
            <Box className='pdf-viewer-toolbar-pages'>
              <JumpToPage
                handlePageChange={handlePageChange}
                // numPages={numPages}
                trigger={
                  <Tooltip arrow placement='top' title='跳转页面'>
                    <Box
                      children={pageNumber}
                      sx={{ border: '1px solid #2196f3', minWidth: '2em', textAlign: 'center' }}
                    />
                  </Tooltip>
                }
              />
              <span>&nbsp;/ {numPages}</span>
            </Box>
          )}
          {showPageStep && !!numPages && (
            <Tooltip arrow placement='top' title='下一页'>
              <IconButton
                size='small' color='primary'
                onClick={() => handlePageChange('next')}
              >
                <NavigateNext />
              </IconButton>
            </Tooltip>
          )}
          {showLastPage && !down && !!numPages && (
            <Tooltip arrow placement='top' title='跳转到最后1页'>
              <IconButton
                size='small' color='primary'
                onClick={() => handlePageChange(numPages)}
              >
                <LastPage />
              </IconButton>
            </Tooltip>
          )}
          {showRotate && !!numPages && (
            <Tooltip arrow placement='top' title='顺时针旋转'>
              <IconButton size='small' color='primary' onClick={() => handleRotate('right')}>
                <Rotate90DegreesCwTwoTone />
              </IconButton>
            </Tooltip>
          )}
          {showRotate && !down && !!numPages && (
            <Box
              sx={{ border: '0.5px solid #2196f3', minWidth: '2em', textAlign: 'center' }}
              children={`${rotate}°`}
            />
          )}
          {showRotate && !!numPages && (
            <Tooltip arrow placement='top' title='逆时针旋转'>
              <IconButton size='small' color='primary' onClick={() => handleRotate('left')}>
                <Rotate90DegreesCcwOutlined />
              </IconButton>
            </Tooltip>
          )}
          {showScaleStep && !!numPages && (
            <Tooltip arrow placement='top' title='缩小视图'>
              <IconButton size='small' color='primary' onClick={() => handleScale('in')}>
                <ZoomOutOutlined />
              </IconButton>
            </Tooltip>
          )}
          {showScale && !down && !!numPages && (
            <Box
            // @ts-ignore
              children={`${parseInt(scale * 100)}%`}
              sx={{ border: '0.5px solid #2196f3', minWidth: '3em', textAlign: 'center' }}
            />
          )}
          {showScaleStep && !!numPages && (
            <Tooltip arrow placement='top' title='放大视图'>
              <IconButton size='small' color='primary' onClick={() => handleScale('out')}>
                <ZoomInOutlined />
              </IconButton>
            </Tooltip>
          )}
          {showDownload && !!numPages && (
            <Tooltip arrow placement='top' title='文档下载'>
              <IconButton
                size='small' color='primary'
                // @ts-ignore
                onClick={() => generateFileDownload(pdf, fileName, '.pdf', { onDownloadSuccess, onDownloadFail, onDownloadStart })}
              >
                <CloudDownloadOutlined />
              </IconButton>
            </Tooltip>
          )}
          {showReload && (
            <Tooltip arrow placement='top' title='文件重载'>
              <IconButton size='small' color='secondary'
                onClick={() => fetchPdf(true)}
              >
                <Cached />
              </IconButton>
            </Tooltip>
          )}
          {showFullScreen && (
            <Tooltip arrow placement='top' title={fullScreen ? '取消全屏' : '全屏'}>
              <IconButton
                size='small'
                color='primary'
                onClick={() => setFullScreen((s) => !s)}
              >
                {fullScreen ? <ZoomInMapOutlined /> : <ZoomOutMapOutlined />}
              </IconButton>
            </Tooltip>
          )}
          {showReset && !!numPages && (
            <Tooltip arrow placement='top' title='状态重置'>
              <IconButton size='small' color='primary' onClick={handleReset}>
                <RestartAlt />
              </IconButton>
            </Tooltip>
          )}
        </DialogContent>
      )}
      <DialogContent {...contentProps} sx={{ px: 0, py: '8px', ...(contentProps?.sx || {}), flex: 1 }} ref={contentRef}>
        {pdf ? (
          <Document {...(documentProps || {})} key={key} file={pdf} onLoadSuccess={onLoadSuccess} rotate={rotate}>
            <Box className='pdf-pages-container'>
              {new Array(numPages || 0).fill('').map((el, index) => (
                <ExtendedPage
                  inViewRef={inViewRef}
                  // @ts-ignore
                  rootRef={contentRef}
                  handlePageChange={handlePageChange}
                  key={`${key}_${index + 1}`}
                  pageNumber={index + 1}
                  customTextRenderer={customTextRenderer}
                  scale={scale}
                  className={`${id}-${index + 1}`}
                  updatePageOnScroll={updatePageOnScroll && showToolbar}
                />
              ))}
            </Box>
          </Document>
        ) : (
          <Box>
            <NoData noDataText='文件不存在' />
          </Box>
        )}
      </DialogContent>
    </Modal >
  );
};

PdfModalViewer.displayName = 'iimm.Mui.PdfModalViewer';

PdfModalViewer.defaultProps = {
  showToolbar: true,
  showFullScreen: true,
  showRotate: true,
  showScale: true,
  showScaleStep: true,
  maxWidth: 'lg',
  showDownload: true,
  showReload: true,
  shouldReload: 0,
  showReset: true,
  showFirstPage: true,
  showLastPage: true,
  showPagination: true,
  showPageStep: true,
  responsive: true,
  breakpoint: 'sm',
  updatePageOnScroll: true,
  fullWidth: true,
  showConfirm: false,
  cancelText: '关闭',
};
