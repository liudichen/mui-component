import { type ReactNode } from "react";
import { Tooltip } from "@mui/material";

import { Modal, type ModalProps } from "../../feedback";
import { AttachmentViewer, type AttachmentViewerProps } from "../AttachmentViewer";

export interface AttachmentModalViewerProps extends ModalProps, AttachmentViewerProps {
  /** urls中每条 url路径前缀 */
  urlPrefix?: string;
  /** 当 urls列表为空时，显示的内容
   * @default '-''
   */
  fallback?: ReactNode;
  triggerTooltip?: ReactNode;
  triggerText?: ReactNode;
}

export const AttachmentModalViewer = (props: AttachmentModalViewerProps): JSX.Element => {
  const {
    fileTypeIconSize,
    showFileTypeIcon,
    itemBarBoxProps,
    fileInfoParser,
    itemBarClassName,
    fileNameWrap,
    onFileDownload,
    onFileDownloadStart,
    previewIcon,
    previewTooltip,
    showPreview,
    downloadIcon,
    downloadTooltip,
    showDownload,
    FilePreviewRender,
    previewModalProps,
    urls,
    fileListBoxProps = { mt: 0.5 },
    fileListBoxClassName,
    urlPrefix,
    fallback,
    triggerTooltip,
    triggerText,
    ...restProps
  } = props;

  if (!urls || !urls?.length) return (fallback || <span>-</span>) as JSX.Element;

  return (
    <Modal
      trigger={
        <Tooltip arrow placement="top" title={triggerTooltip || "附件列表"}>
          <span>
            {triggerText || "附件"}
            {urls?.length ? ` * ${urls.length}` : ""}
          </span>
        </Tooltip>
      }
      fullWidth
      responsive
      title="附件列表"
      showConfirm={false}
      cancelText="关闭"
      {...restProps}
    >
      <AttachmentViewer
        urls={
          urlPrefix
            ? urls?.map((ele) =>
                typeof ele === "string" ? `${urlPrefix}${ele}` : { ...ele, url: `${urlPrefix}${ele.url}` }
              )
            : urls
        }
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
