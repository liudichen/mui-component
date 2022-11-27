import React from 'react';
import { useControllableValue, useDeepCompareEffect, useMemoizedFn, useSafeState } from 'ahooks';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Link, IconButton } from '@mui/material';
import { isMobile } from 'react-device-detect';
import { IconX } from '@tabler/icons';

import ImageCarousel from './ImageCarousel';

const ImageCarouselModal = (props) => {
  const {
    trigger, triggerSx, triggerProps, showCloseIcon, CloseIcon,
    // eslint-disable-next-line no-unused-vars
    open: openProp, onClose,
    title,
    children, images: imagesProps,
    fullWidth, fullScreen, maxWidth,
    PaperProps, DialogProps,
    ...restProps
  } = props;
  const [ images, setImages ] = useSafeState([]);
  const fetchImages = useMemoizedFn(async () => {
    if (typeof imagesProps === 'function') {
      const res = await imagesProps();
      setImages(res || []);
    } else if (Array.isArray(imagesProps)) {
      if (imagesProps.length) {
        if (typeof imagesProps[0] === 'function') {
          const imgs = [];
          for (let i = 0; i < imagesProps.length; i++) {
            const img = await imagesProps[i]();
            imgs.push(img);
          }
          setImages(imgs);
        } else {
          setImages(imagesProps);
        }
      } else {
        setImages([]);
      }
    } else {
      setImages(imagesProps ? [ imagesProps ] : []);
    }
  });
  useDeepCompareEffect(() => fetchImages(), [ imagesProps ]);
  const [ open, setOpen ] = useControllableValue(props, { valuePropName: 'open', trigger: 'onClose', defaultValue: false });
  return (
    <>
      <Link
        {...{
          underline: 'none',
          ...(triggerProps || {}),
          sx: {
            cursor: 'pointer',
            ...(triggerSx || {}),
          },
        }}
        onClick={() => setOpen(true)}
      >
        { trigger }
      </Link>
      <Dialog
        {...{
          PaperProps,
          fullWidth,
          maxWidth,
          fullScreen,
          ...(DialogProps || {}),
          open,
          onClose: () => setOpen(false),
        }}
      >
        <DialogTitle variant='h4' component='div'>
          { title }
          { showCloseIcon && (
            <IconButton
              aria-label='close'
              onClick={() => setOpen(false)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              { CloseIcon }
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent>
          <ImageCarousel images={images} {...restProps}>
            { children }
          </ImageCarousel>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={() => setOpen(false)}>
            关闭
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
ImageCarouselModal.defaultProps = {
  fullWidth: true,
  maxWidth: 'md',
  title: '图片预览',
  fullScreen: isMobile,
  CloseIcon: <IconX size='24px'/>,
  showCloseIcon: true,
};

export {
  ImageCarousel,
};

export default ImageCarouselModal;
