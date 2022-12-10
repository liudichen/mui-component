import React from 'react';
import { useSafeState } from 'ahooks';
import { Box, Button, Dialog, IconButton } from '@mui/material';
import { Download } from '@mui/icons-material';
import { IconMaximize, IconMinimize } from '@tabler/icons';
import { generateFileDownload } from '@iimm/shared';

import { Modal, ModalProps } from '../Modal';

interface ImageModalViewerProps extends ModalProps {
  imgSrc: string,
  showDownload?: boolean,
  onFileDownloadStart?: (fileUrl: string, fileName?: string) => void | boolean,
  /** 点击文件下载后的回调 */
  onFileDownload?: (fileUrl: string, fileName?: string) => void | Promise<void>,
  imgProps?: React.HTMLAttributes<HTMLImageElement>
}

export const ImageModalViewer = (props: ImageModalViewerProps) => {
  const { imgSrc, showDownload, imgProps, onFileDownload, onFileDownloadStart, ...restProps } = props;
  const [ fullScreen, setFullScreen ] = useSafeState(false);
  return (
    <Modal
      {...restProps}
      extraActions={showDownload ? (
        <Button
          variant="outlined"
          startIcon={<Download />}
          // @ts-ignore
          onClick={() => generateFileDownload(imgSrc, undefined, undefined, { onDownloadSuccess: onFileDownload, onDownloadStart: onFileDownloadStart })}
        >
          下载
        </Button>
      ) : undefined}
    >
      <Box display='flex' justifyContent='center' overflow='hidden' alignItems='center' height='100%'>
        <Box position='relative'>
          <img
            src={imgSrc}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
            {...(imgProps || {})}
          />
          <IconButton
            onClick={() => setFullScreen((s) => !s)}
            sx={{
              position: 'absolute',
              right: 0,
              bottom: 0,
            }}
          >
            {fullScreen ? <IconMinimize /> : <IconMaximize />}
          </IconButton>
        </Box>
      </Box>
      <Dialog
        open={fullScreen}
        onClose={() => setFullScreen(false)}
        fullWidth
        fullScreen
        sx={{ '& .MuiDialog-paper': { backgroundColor: 'transparent' } }}
      >
        <Box display='flex' justifyContent='center' overflow='hidden' alignItems='center' height='100vh'>
          <Box position='relative'>
            <img
              src={imgSrc}
              style={{
                maxHeight: '100vh',
                maxWidth: '100vw',
                objectFit: 'contain',
              }}
              {...(imgProps || {})}
            />
            <IconButton
              color='primary'
              size='large'
              onClick={() => setFullScreen((s) => !s)}
              sx={{
                position: 'absolute',
                right: 0,
                bottom: 0,
              }}
            >
              {fullScreen ? <IconMinimize /> : <IconMaximize />}
            </IconButton>
          </Box>
        </Box>
      </Dialog>
    </Modal>
  );
};

ImageModalViewer.defaultProps = {
  fullWidth: true,
  responsive: true,
  maxWidth: 'md',
  title: '图片预览',
  showConfirm: false,
  cancelText: '关闭',
};

ImageModalViewer.displayName = 'iimm.Mui.ImageModalViewer';
