import { type ReactNode } from 'react';
import { Button } from '@mui/material';
import { Download } from '@mui/icons-material';
import { Player, type PlayerProps } from 'video-react';
import { generateFileDownload } from '@iimm/shared';
import 'video-react/dist/video-css';

import { Modal } from '../../feedback';
import type { ModalProps } from '../../feedback';

export interface VideoModalViewerProps extends PlayerProps {
  showDownload?: boolean,
  trigger: ReactNode,
  fileName?: string,
  fileSrc: string,
  modalProps?: ModalProps,
  onFileDownloadStart?: (fileUrl: string, fileName?: string) => void | boolean,
  /** 点击文件下载后的回调 */
  onFileDownload?: (fileUrl: string, fileName?: string) => void | Promise<void>,
}

export const VideoModalViewer = (props: VideoModalViewerProps) => {
  const { showDownload, trigger, fileSrc, fileName, modalProps, onFileDownload, onFileDownloadStart, ...restProps } = props;
  return (
    <Modal
      trigger={trigger}
      title={fileName}
      fullWidth
      responsive
      maxWidth='lg'
      showConfirm={false}
      cancelText='关闭'
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
      {...(modalProps || {})}
    >
      <Player src={fileSrc} {...restProps} />
    </Modal>
  );
};

VideoModalViewer.displayName = 'iimm.Mui.VideoModalViewer';
