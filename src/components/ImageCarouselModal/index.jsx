import React from 'react';
import { useDeepCompareEffect, useMemoizedFn, useSafeState } from 'ahooks';

import { ImageCarousel } from './ImageCarousel';
import { Modal } from '../Modal';

const ImageCarouselModal = (props) => {
  const {
    trigger, triggerProps, showCloseIcon, CloseIcon,
    fullWidth, fullScreen, maxWidth,
    draggable, responsive, breakpoint, title, titleProps,
    modalProps, DialogProps,
    open, onClose,
    images: imagesProps,
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
  return (
    <Modal
      title={title}
      titleProps={titleProps}
      trigger={trigger}
      triggerProps={triggerProps}
      fullScreen={fullScreen}
      fullWidth={fullWidth}
      open={open}
      onClose={onClose}
      showCloseIcon={showCloseIcon}
      CloseIcon={CloseIcon}
      maxWidth={maxWidth}
      draggable={draggable}
      responsive={responsive}
      breakpoint={breakpoint}
      showConfirm={false}
      cancelText='关闭'
      {...((modalProps ?? DialogProps) || {})}
    >
      <ImageCarousel
        images={images}
        {...restProps}
      />
    </Modal>
  );
};
ImageCarouselModal.defaultProps = {
  fullWidth: true,
  maxWidth: 'md',
  title: '图片预览',
  titleProps: { variant: 'h4', component: 'div', fontSize: undefined },
  responsive: true,
};

ImageCarouselModal.displayName = 'iimm.Mui.ImageCarouselModal';

export {
  ImageCarousel,
  ImageCarouselModal,
};

