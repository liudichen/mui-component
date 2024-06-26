import { type ReactNode } from "react";
import { Alert, Button } from "@mui/material";
import { Download } from "@mui/icons-material";
import { generateFileDownload } from "@iimm/shared";

import { Modal } from "../../../../feedback";
import type { ModalProps } from "../../../../feedback";
import { PdfModalViewer, type PdfModalViewerProps } from "../../../PdfModalViewer";
import { VideoModalViewer } from "../../../VideoModalViewer";
import { ImageModalViewer } from "../../../ImageModalViewer";

export interface FileViewRenderProps {
  fileSrc: string;
  fileName?: string;
  view?: boolean;
  trigger: ReactNode;
  type: "pdf" | "image" | "video" | string;
  showDownload?: boolean;
  onFileDownloadStart?: (fileUrl: string, fileName?: string) => void | boolean;
  onFileDownload?: (fileUrl: string, fileName?: string) => void | Promise<void>;
  modalProps?: Omit<ModalProps, "onReset">;
  pdfViewerProps?: PdfModalViewerProps;
}

// const ViewList = [ 'pdf', 'image', 'video' ];

const FallbackModalViewer = (props: Omit<FileViewRenderProps, "view" | "type">) => {
  const { fileSrc, fileName, trigger, showDownload, onFileDownload, onFileDownloadStart, modalProps } = props;
  return (
    <Modal
      trigger={trigger}
      title={fileName}
      fullWidth
      responsive
      extraActions={
        showDownload ? (
          <Button
            variant="outlined"
            startIcon={<Download />}
            // @ts-ignore
            onClick={() =>
              generateFileDownload(fileSrc, fileName, undefined, {
                onDownloadSuccess: onFileDownload,
                onDownloadStart: onFileDownloadStart,
              })
            }
          >
            下载
          </Button>
        ) : undefined
      }
      {...modalProps}
    >
      <Alert severity="info">此文件格式暂不支持预览</Alert>
    </Modal>
  );
};

export const FileViewRender = (props: FileViewRenderProps) => {
  const {
    fileSrc,
    fileName,
    view,
    trigger,
    type,
    showDownload,
    onFileDownload,
    onFileDownloadStart,
    modalProps,
    pdfViewerProps,
  } = props;
  if (!view) return null;
  if (type === "pdf") {
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
        {...(pdfViewerProps || {})}
      />
    );
  } else if (type === "image") {
    return (
      <ImageModalViewer
        trigger={trigger}
        showDownload={showDownload}
        imgSrc={fileSrc}
        // @ts-ignore
        title={fileName}
        onFileDownload={onFileDownload}
        onFileDownloadStart={onFileDownloadStart}
        {...(modalProps || {})}
      />
    );
  } else if (type === "video") {
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
