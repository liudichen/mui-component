import React from 'react';
import { Player, PlayerProps, ControlBar, PlaybackRateMenuButton } from 'video-react';
import 'video-react/dist/video-react.css';

import { Modal, ModalProps } from '../Modal';
import { DownloadButton } from './DownloadButton';

export interface VideoModalViewerProps extends PlayerProps {
  showDownload?: boolean,
  trigger: React.ReactNode,
  fileName?: string,
  fileSrc: string,
  modalProps?: ModalProps
}

export const VideoModalViewer = (props: VideoModalViewerProps) => {
  const { showDownload, trigger, fileSrc, fileName, modalProps, ...restProps } = props;
  return (
    <Modal
      trigger={trigger}
      title={fileName}
      fullWidth
      responsive
      maxWidth='lg'
      {...(modalProps || {})}
    >
      <Player src={fileSrc} {...restProps}>
        <ControlBar>
          <PlaybackRateMenuButton order={7.1} />
          {showDownload && (
            <DownloadButton order={7.2} />
          )}
        </ControlBar>
      </Player>
    </Modal>
  );
};
