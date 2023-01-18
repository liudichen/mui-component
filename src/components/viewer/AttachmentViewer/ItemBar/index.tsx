import React from 'react';
import { useCreation, useDebounceFn } from 'ahooks';
import { Box, IconButton, Tooltip } from '@mui/material';
import { BoxProps } from '@mui/material';
import { CloudDownloadOutlined, PreviewOutlined } from '@mui/icons-material';
import { generateFileDownload } from '@iimm/shared';
import clsx from 'classnames';

import { getFileInfo } from '../util';
import { FileViewRender } from './FileViewRender';
import type { FileViewRenderProps } from './FileViewRender';
import type { ModalProps } from '../../../feedback';

export interface ItemBarProps {
  file: string,
  /** 文件类型svg图标的大小
   * @default 24
   */
  fileTypeIconSize?: number,
  /** 显示文件类型图标 ?
   * @default true
  */
  showFileTypeIcon?: boolean,
  /** 文件条目(每行)的外层Box的props */
  itemBarBoxProps?: BoxProps,
  /** 从url中获取文件名、文件类型、文件图标、是否可以直接预览、预览组件的函数 */
  fileInfoParser?: typeof getFileInfo,
  /** 传递给每行条目Box的className
   * (默认拥有attachmentViewer-itemBar的className)
  */
  itemBarClassName?: string,
  /** 点击文件下载时的回调，可以用来传入消息条等
   * (如果返回false则不会进行后续下载操作)
   */
  onFileDownloadStart?: (fileUrl: string, fileName?: string) => void | boolean,
  /** 点击文件下载后的回调 */
  onFileDownload?: (fileUrl: string, fileName?: string) => void | Promise<void>,
  /** 预览按钮Tooltip的title*/
  previewTooltip?: React.ReactNode | ((fileUrl: string) => React.ReactNode),
  /** 下载按钮Tooltip的title*/
  downloadTooltip?: React.ReactNode | ((fileUrl: string) => React.ReactNode),
  /** @default <PreviewOutlined /> */
  previewIcon?: React.ReactNode,
  /** @default <CloudDownloadOutlined /> */
  downloadIcon?: React.ReactNode,
  /** 显示下载?
   * @default true
   */
  showDownload?: boolean,
  /** 显示预览?
   * @default true
   */
  showPreview?: boolean,
  /** 文件名过长换行?
   * @default false
   */
  fileNameWrap?: boolean,
  FilePreviewRender?: React.ComponentType<FileViewRenderProps>,
  /** 点击预览按钮后的弹窗Modal的props */
  previewModalProps?: ModalProps
}

export const ItemBar = (props: ItemBarProps) => {
  const { file, fileTypeIconSize = 24, showFileTypeIcon = true, itemBarBoxProps, fileInfoParser = getFileInfo, itemBarClassName, fileNameWrap,
    onFileDownload, onFileDownloadStart,
    previewIcon = <PreviewOutlined />, previewTooltip, showPreview = true,
    downloadIcon = <CloudDownloadOutlined />, downloadTooltip, showDownload = true,
    FilePreviewRender = FileViewRender, previewModalProps,
  } = props;
  const fileInfo = useCreation(() => fileInfoParser(file, fileTypeIconSize), [ file ]);
  const { run: download } = useDebounceFn((file) => {
    const start = onFileDownloadStart?.(file, fileInfo?.fileName);
    if (start !== false) {
      generateFileDownload(file);
      onFileDownload?.(file);
    }
  }, { leading: true, trailing: false });
  return (
    <Box
      display='flex'
      flexDirection='row'
      alignItems='center'
      gap={0.5}
      {...itemBarBoxProps}
      className={clsx('attachmentViewer-itemBar', itemBarClassName)}
    >
      {showFileTypeIcon && (
        <Box className='attachmentViewer-itemBar-fileIcon'>
          {fileInfo.icon}
        </Box>
      )}
      <Box flex={1} className={clsx({
        'attachmentViewer-itemBar-fileName': true,
        'text-ellipsis': !fileNameWrap,
      })}>
        <Tooltip title={fileInfo.fileName} arrow placement='top'>
          <span>{fileInfo.fileName}</span>
        </Tooltip>
      </Box>
      <Box className='attachmentViewer-itemBar-action'>
        {!!fileInfo.view && showPreview && (
          <FilePreviewRender
            fileSrc={file}
            modalProps={previewModalProps}
            type={fileInfo.type}
            fileName={fileInfo.fileName}
            view={fileInfo.view}
            trigger={(
              <Tooltip
                arrow
                placement='top'
                title={
                  typeof previewTooltip === 'function' ? previewTooltip(file) : previewTooltip
                }
              >
                <IconButton color='info'>
                  {previewIcon}
                </IconButton>
              </Tooltip>
            )}
            showDownload={showDownload}
          />
        )}
        {!fileInfo.view && showDownload && (
          <Tooltip
            arrow
            placement='top'
            title={
              typeof downloadTooltip === 'function' ? downloadTooltip(file) : downloadTooltip
            }
          >
            <IconButton
              color='secondary'
              onClick={() => download(file)}
            >
              {downloadIcon}
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

ItemBar.displayName = 'iimm.Mui.AttachmentViewer.ItemBar';
