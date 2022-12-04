import React from 'react';

import { CarouselProps, ImageItem, ImageCarouselProps } from './ImageCarousel';
import { ModalProps } from '../Modal';

export interface ImageCarouselModalProps extends CarouselProps, Pick<ModalProps, 'trigger' | 'triggerProps' | 'open' | 'onClose' | 'showCloseIcon' | 'CloseIcon' | 'maxWidth' | 'draggable' | 'responsive' | 'breakpoint' | 'fullScreen' | 'fullWidth' | 'title' | 'titleProps'> {
  modalProps?: ModalProps,
  /**
   * @deprecated 不再使用,请使用modalProps
   */
  DialogProps?: ModalProps,
  /** images的优先级低于children */
  images?: ImageItem[] | (() => ImageItem[]) | (()=>ImageItem)[] | ImageItem,
}

export declare const ImageCarousel: React.FC<React.PropsWithChildren<ImageCarouselProps>>;

export declare const ImageCarouselModal: React.FC<React.PropsWithChildren<ImageCarouselModalProps>>;

