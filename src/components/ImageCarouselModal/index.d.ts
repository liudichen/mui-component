/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 16:25:04
 * @LastEditTime: 2022-06-13 11:11:08
 */
import React from 'react';
import { ImageCarouselProps } from './ImageCarousel';
import { DialogProps, LinkProps, PaperProps } from '@mui/material';

type maxWidthString = 'sm' | 'xs' |' md' | 'lg' | 'xl';

interface ImageCarouselModalProps extends ImageCarouselProps {
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
}

declare const ImageCarousel:React.FunctionComponent<ImageCarouselProps>;
declare const ImageCarouselModal:React.FunctionComponent<ImageCarouselModalProps>;

export {
  ImageCarousel,
  ImageCarouselProps,
  ImageCarouselModalProps,
};

export default ImageCarouselModal;
