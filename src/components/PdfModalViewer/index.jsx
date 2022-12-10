import React, { useEffect, useRef, useImperativeHandle } from 'react';
import { useControllableValue, useMemoizedFn, useSafeState } from 'ahooks';
import { Box, DialogContent, IconButton, Tooltip, useTheme, useMediaQuery } from '@mui/material';
import { Document, pdfjs } from 'react-pdf';
import { FirstPage, LastPage, NavigateBefore, NavigateNext, Rotate90DegreesCcwOutlined, Rotate90DegreesCwTwoTone, CloudDownloadOutlined, RestartAlt, ZoomInMapOutlined, ZoomOutMapOutlined, ZoomInOutlined, ZoomOutOutlined, Cached } from '@mui/icons-material';
import { useGlobalId, generateFileDownload, scrollToElement } from '@iimm/shared';
import classNames from 'classnames';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import { Modal } from '../Modal';
import { NoData } from '../NoData';
import { ExtendedPage } from './ExtendedPage';
import { JumpToPage } from './JumpToPage';
import './index.scss';

export { pdfjs };

export const PdfModalViewer = (props) => {
  const { file, fileName: fileNameProp, trigger, title,
    showToolbar, toolbarClassName,
    showFullScreen, defaultFullScreen: fullScreenProp, responsive, breakpoint, fullWidth,
    showRotate, onRotateChange, defaultRotate,
    showScale, onScaleChange, maxScale, minScale, defaultScale, showScaleStep,
    showReset, onReset,
    showReload, onReload, shouldReload,
    showDownload, onDownloadSuccess, onDownloadFail, onDownloadStart,
    defaultPageNumber, showPagination, showFirstPage, showLastPage, showPageStep, updatePageOnScroll, onPageNumberChange, onPdfLoadSuccess, onPdfFetchError,
    documentProps, contentProps,
    // eslint-disable-next-line no-unused-vars
    open: openProp, setOpen: setOpenProp, setOpenRef,
    // eslint-disable-next-line no-unused-vars
    content, children, withDialogContentWrapper,
    ...restProps
  } = props;
  const theme = useTheme();
  const inViewRef = useRef({});
  const contentRef = useRef();
  const shouldReloadRef = useRef(0);
  const id = useGlobalId();
  const [ key, setKey ] = useSafeState(0);
  const [ open, setOpen ] = useControllableValue(props, { defaultValue: false, valuePropName: 'open', trigger: 'setOpen' });
  const [ fetchLoading, setFetchLoading ] = useSafeState(false);
  const [ pdf, setPdf ] = useSafeState(null);
  const [ fileName, setFileName ] = useSafeState(fileNameProp);
  const [ numPages, setNumPages ] = useSafeState(null);
  const [ pageNumber, setPageNumber ] = useSafeState(null);
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
    if (fileName) setFileName(null);
    if (numPages) setNumPages(null);
    if (pageNumber) setPageNumber(null);
    let pdfFile = null;
    let pdfName = fileNameProp;
    try {
      if (typeof file === 'function') {
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
      setPdf(pdfFile || null);
      setFileName(pdfName || null);
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
    setPageNumber(defaultPageNumber && defaultPageNumber <= numPages ? defaultPageNumber : 1);
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
        scrollToElement(query);
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
                numPages={numPages}
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
      <DialogContent {...contentProps} sx={{ px: 0, py: '8px', ...(contentProps?.sx || {}) }} flex={1} ref={contentRef}>
        {pdf ? (
          <Document {...(documentProps || {})} key={key} file={pdf} onLoadSuccess={onLoadSuccess} rotate={rotate}>
            <Box className='pdf-pages-container'>
              {new Array(numPages || 0).fill('').map((el, index) => (
                <ExtendedPage
                  inViewRef={inViewRef}
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
