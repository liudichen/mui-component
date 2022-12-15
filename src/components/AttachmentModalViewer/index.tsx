import React from 'react';
import { Tooltip } from '@mui/material';

import { Modal, ModalProps } from '../Modal';
import { AttachmentViewer, AttachmentViewerProps } from '../AttachmentViewer';

export interface AttachmentModalViewerProps extends ModalProps, AttachmentViewerProps {
  /** urls中每条 url路径前缀 */
  urlPrefix?: string,
  /** 当 urls列表为空时，显示的内容
   * @default '-''
  */
  fallback?: React.ReactNode,
}

export const AttachmentModalViewer = (props: AttachmentModalViewerProps) => {
  const {
    fileTypeIconSize, showFileTypeIcon, itemBarBoxProps, fileInfoParser, itemBarClassName, fileNameWrap,
    onFileDownload, onFileDownloadStart,
    previewIcon, previewTooltip, showPreview,
    downloadIcon, downloadTooltip, showDownload,
    FilePreviewRender, previewModalProps,
    urls,
    fileListBoxProps, fileListBoxClassName,
    urlPrefix, fallback,
    ...restProps
  } = props;
  if (typeof fallback !== 'undefined' && (!urls || !urls?.length)) return fallback;
  return (
    <Modal
      {...restProps}
    >
      <AttachmentViewer
        urls={urlPrefix ? urls?.map((ele) => `${urlPrefix}${ele}`) : urls}
        fileListBoxClassName={fileListBoxClassName}
        fileListBoxProps={fileListBoxProps}
        fileTypeIconSize={fileTypeIconSize}
        showFileTypeIcon={showFileTypeIcon}
        itemBarBoxProps={itemBarBoxProps}
        itemBarClassName={itemBarClassName}
        fileInfoParser={fileInfoParser}
        fileNameWrap={fileNameWrap}
        onFileDownload={onFileDownload}
        onFileDownloadStart={onFileDownloadStart}
        previewIcon={previewIcon}
        previewTooltip={previewTooltip}
        showPreview={showPreview}
        downloadIcon={downloadIcon}
        downloadTooltip={downloadTooltip}
        showDownload={showDownload}
        FilePreviewRender={FilePreviewRender}
        previewModalProps={previewModalProps}
      />
    </Modal>
  );
};

AttachmentModalViewer.defaultProps = {
  fullWidth: true,
  responsive: true,
  trigger: (
    <Tooltip arrow placement='top' title='附件列表'>
      <span>附件</span>
    </Tooltip>
  ),
  title: '附件列表',
  fallback: <span>-</span>,
};

AttachmentModalViewer.displayName = 'iimm.Mui.AttachmentModalViewer';
