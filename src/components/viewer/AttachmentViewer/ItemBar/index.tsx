import { type ReactNode, type ComponentType } from "react";
import { useCreation, useDebounceFn } from "ahooks";
import { Box, IconButton, Tooltip, type BoxProps } from "@mui/material";
import { CloudDownloadOutlined, PreviewOutlined } from "@mui/icons-material";
import { IconError404 } from "@tabler/icons-react";
import { generateFileDownload } from "@iimm/shared";
import clsx from "classnames";

import { getFileInfo } from "../util";
import { FileViewRender } from "./FileViewRender";
import type { FileViewRenderProps } from "./FileViewRender";
import type { ModalProps } from "../../../feedback";
import type { PdfModalViewerProps } from "../../PdfModalViewer";

interface ObjectUrlItem {
  url: string;
  name?: string;
}

export type UrlItem = string | ObjectUrlItem;

export interface ItemBarProps {
  file: UrlItem;
  /** 文件类型svg图标的大小
   * @default 24
   */
  fileTypeIconSize?: number;
  /** 显示文件类型图标 ?
   * @default true
   */
  showFileTypeIcon?: boolean;
  /** 文件条目(每行)的外层Box的props */
  itemBarBoxProps?: BoxProps;
  /** 从url中获取文件名、文件类型、文件图标、是否可以直接预览、预览组件的函数 */
  fileInfoParser?: typeof getFileInfo;
  /** 传递给每行条目Box的className
   * (默认拥有attachmentViewer-itemBar的className)
   */
  itemBarClassName?: string;
  /** 点击文件下载时的回调，可以用来传入消息条等
   * (如果返回false则不会进行后续下载操作)
   */
  onFileDownloadStart?: (fileUrl: string, fileName?: string) => void | boolean;
  /** 点击文件下载后的回调 */
  onFileDownload?: (fileUrl: string, fileName?: string) => void | Promise<void>;
  /** 预览按钮Tooltip的title*/
  previewTooltip?: ReactNode | ((fileUrl: string) => ReactNode);
  /** 下载按钮Tooltip的title*/
  downloadTooltip?: ReactNode | ((fileUrl: string) => ReactNode);
  /** @default <PreviewOutlined /> */
  previewIcon?: ReactNode;
  /** @default <CloudDownloadOutlined /> */
  downloadIcon?: ReactNode;
  /** 显示下载?
   * @default true
   */
  showDownload?: boolean;
  /** 显示预览?
   * @default true
   */
  showPreview?: boolean;
  /** 文件名过长换行?
   * @default false
   */
  fileNameWrap?: boolean;
  FilePreviewRender?: ComponentType<FileViewRenderProps>;
  /** 点击预览按钮后的弹窗Modal的props */
  previewModalProps?: ModalProps;

  pdfViewerProps?: PdfModalViewerProps;
}

export const ItemBar = (props: ItemBarProps) => {
  const {
    file,
    fileTypeIconSize = 24,
    showFileTypeIcon = true,
    itemBarBoxProps,
    fileInfoParser = getFileInfo,
    itemBarClassName,
    fileNameWrap,
    onFileDownload,
    onFileDownloadStart,
    previewIcon = <PreviewOutlined />,
    previewTooltip,
    showPreview = true,
    downloadIcon = <CloudDownloadOutlined />,
    downloadTooltip,
    showDownload = true,
    FilePreviewRender = FileViewRender,
    previewModalProps,
    pdfViewerProps,
  } = props;
  const fileInfo = useCreation(() => fileInfoParser(file, fileTypeIconSize), [file]);
  const { run: download } = useDebounceFn(
    (file) => {
      if (!fileInfo) return;
      const start = onFileDownloadStart?.(fileInfo?.url, fileInfo?.fileName);
      if (start !== false) {
        generateFileDownload(file);
        onFileDownload?.(file);
      }
    },
    { leading: true, trailing: false }
  );
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      gap={0.5}
      {...itemBarBoxProps}
      className={clsx("attachmentViewer-itemBar", itemBarClassName)}
    >
      {showFileTypeIcon && (
        <Box className="attachmentViewer-itemBar-fileIcon">
          {fileInfo?.icon || <IconError404 color="red" size={24} />}
        </Box>
      )}
      <Box
        flex={1}
        className={clsx({
          "attachmentViewer-itemBar-fileName": true,
          "text-ellipsis": !fileNameWrap,
        })}
      >
        {!!fileInfo?.fileName ? (
          <Tooltip title={fileInfo.fileName} arrow placement="top">
            <span>{fileInfo.fileName}</span>
          </Tooltip>
        ) : (
          <span style={{ color: "red", fontWeight: "bold" }}>获取文件信息出错了</span>
        )}
      </Box>
      {!!fileInfo?.url && (
        <Box className="attachmentViewer-itemBar-action">
          {!!fileInfo?.view && showPreview && (
            <FilePreviewRender
              fileSrc={fileInfo.url}
              modalProps={previewModalProps}
              pdfViewerProps={pdfViewerProps}
              type={fileInfo.type}
              fileName={fileInfo.fileName}
              view={fileInfo.view}
              trigger={
                <Tooltip
                  arrow
                  placement="top"
                  title={typeof previewTooltip === "function" ? previewTooltip(fileInfo.url) : previewTooltip}
                >
                  <IconButton color="info">{previewIcon}</IconButton>
                </Tooltip>
              }
              showDownload={showDownload}
            />
          )}
          {!fileInfo?.view && showDownload && (
            <Tooltip
              arrow
              placement="top"
              title={typeof downloadTooltip === "function" ? downloadTooltip(fileInfo.url) : downloadTooltip}
            >
              <IconButton color="secondary" onClick={() => download(file)}>
                {downloadIcon}
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )}
    </Box>
  );
};

// ItemBar.displayName = 'iimm.Mui.AttachmentViewer.ItemBar';
