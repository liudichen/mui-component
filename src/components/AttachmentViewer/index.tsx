import React from 'react';
import { Box, BoxProps } from '@mui/material';
import clsx from 'classnames';

import { ItemBar, ItemBarProps } from './ItemBar';
import './style.scss';

export interface AttachmentViewerProps extends Omit<ItemBarProps, 'file'> {
  /** url地址 */
  urls: string[],
  /** 传递给文件列表最外层的Box的props */
  fileListBoxProps?: BoxProps,
  /** 文件列表最外层Box的className */
  fileListBoxClassName?: string,
}

/** 展示附件信息预览的组件 */
export const AttachmentViewer = (props: AttachmentViewerProps) => {
  const { urls, fileListBoxProps, fileListBoxClassName, ...restProps } = props;
  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={1}
      {...(fileListBoxProps || {})}
      className={clsx('attachmentViewer-container', fileListBoxClassName)}
    >
      {urls.map((ele, i) => (
        <ItemBar
          key={i}
          file={ele}
          {...restProps}
        />
      ))}
    </Box>
  );
};

AttachmentViewer.displayName = 'iimm.Mui.AttachmentViewer';
