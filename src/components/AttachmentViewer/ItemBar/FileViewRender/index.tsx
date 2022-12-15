import React from 'react';
import { Alert, Button } from '@mui/material';
import { Download } from '@mui/icons-material';

import { Modal, ModalProps } from '../../../Modal';
import { PdfModalViewer } from '../../../PdfModalViewer';
import { VideoModalViewer } from '../../../VideoModalViewer';
import { ImageModalViewer } from '../../../ImageModalViewer';

export interface FileViewRenderProps {
  fileSrc: string,
  fileName?: string,
  view?: boolean,
  trigger: React.ReactNode,
  type: 'pdf' | 'image' | 'video' | string,
  showDownload: boolean,
  onFileDownloadStart?: (fileUrl: string, fileName?: string) => void | boolean,
  onFileDownload?: (fileUrl: string, fileName?: string) => void | Promise<void>,
  modalProps?: ModalProps
}

// const ViewList = [ 'pdf', 'image', 'video' ];

const FallbackModalViewer = (props: Omit<FileViewRenderProps, 'view' | 'type'>) => {
  const { fileSrc, fileName, trigger, showDownload, onFileDownload, onFileDownloadStart, modalProps } = props;
  return (
    <Modal
      trigger={trigger}
      title={fileName}
      fullWidth
      responsive
      extraActions={showDownload ? (
        <Button
          variant="outlined"
          startIcon={<Download />}
          // @ts-ignore
          onClick={() => generateFileDownload(fileSrc, undefined, undefined, { onDownloadSuccess: onFileDownload, onDownloadStart: onFileDownloadStart })}
        >
          下载
        </Button>
      ) : undefined}
      {...modalProps}
    >
      <Alert severity='info'>
        此文件格式暂不支持预览
      </Alert>
    </Modal>
  );
};

FallbackModalViewer.displayName = 'iimm.Mui.AttachmentViewer.FallbackModalViewer';

export const FileViewRender = (props: FileViewRenderProps) => {
  const { fileSrc, fileName, view, trigger, type, showDownload, onFileDownload, onFileDownloadStart, modalProps } = props;
  if (!view) return null;
  if (type === 'pdf') {
    return (
      <PdfModalViewer
        file={fileSrc}
        showDownload={showDownload}
        trigger={trigger}
        title={fileName}
        // @ts-ignore
        onDownloadStart={onFileDownloadStart}
        // @ts-ignore
        onDownloadSuccess={onFileDownload}
        {...(modalProps || {})}
      />
    );
  } else if (type === 'image') {
    return (
      <ImageModalViewer
        trigger={trigger}
        showDownload={showDownload}
        imgSrc={fileSrc}
        title={fileName}
        onFileDownload={onFileDownload}
        onFileDownloadStart={onFileDownloadStart}
        {...modalProps || {}}
      />
    );
  } else if (type === 'video') {
    return (
      <VideoModalViewer
        trigger={trigger}
        showDownload={showDownload}
        fileSrc={fileSrc}
        fileName={fileName}
        modalProps={modalProps}
        onFileDownload={onFileDownload}
        onFileDownloadStart={onFileDownloadStart}
      />
    );
  }
  return (
    <FallbackModalViewer
      trigger={trigger}
      showDownload={showDownload}
      fileSrc={fileSrc}
      fileName={fileName}
      modalProps={modalProps}
      onFileDownload={onFileDownload}
      onFileDownloadStart={onFileDownloadStart}
    />
  );

};

FileViewRender.displayName = 'iimm.Mui.AttachmentViewer.ItemBar.FileViewRender';
