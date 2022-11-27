import React from 'react';
import { DialogProps, LinkProps, PaperProps } from '@mui/material';

import { ImageCarouselProps, carouselProps, imageItem } from './ImageCarousel';

type maxWidthString = 'sm' | 'xs' |' md' | 'lg' | 'xl';

interface ImageCarouselModalProps extends carouselProps {
  open?: boolean,
  onClose?: () => void,
  trigger?: React.ReactNode,
  triggerSx?: object,
  triggerProps?: Omit<LinkProps, 'sx'>
  fullWidth?: boolean,
  fullScreen?: boolean,
  maxWidth?: maxWidthString | string,
  DialogProps?: Omit<Omit<DialogProps, 'open'>, 'onClose'>,
  PaperProps?: PaperProps,
  title?: React.ReactNode,
  images: imageItem[] | (() => imageItem[]) | (()=>imageItem)[] | imageItem,
  showCloseIcon?: boolean,
  CloseIcon?: React.ReactNode,
}

declare const ImageCarousel:React.FunctionComponent<ImageCarouselProps>;
declare const ImageCarouselModal:React.FunctionComponent<ImageCarouselModalProps>;

export {
  ImageCarousel,
  ImageCarouselProps,
  ImageCarouselModalProps,
};

export default ImageCarouselModal;
