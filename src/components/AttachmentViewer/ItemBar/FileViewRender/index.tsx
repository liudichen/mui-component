import React from 'react';

import { ModalProps } from '../../../Modal';
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

const ViewList = [ 'pdf', 'image', 'video' ];

export const FileViewRender = (props: FileViewRenderProps) => {
  const { fileSrc, fileName, view, trigger, type, showDownload, onFileDownload, onFileDownloadStart, modalProps } = props;
  if (!view || !ViewList.includes(type)) return null;
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
      />
    );
  }
  return null;
};

FileViewRender.displayName = 'iimm.Mui.attachmentViewer.ItemBar.FileViewRender';
