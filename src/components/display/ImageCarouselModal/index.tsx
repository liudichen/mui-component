import type { PropsWithChildren } from "react";
import { useDeepCompareEffect, useMemoizedFn, useSafeState } from "ahooks";

import { ImageCarousel } from "./ImageCarousel";
import { Modal } from "../../feedback";
import type { CarouselProps, ImageItem } from "./ImageCarousel";
import type { ModalProps } from "../../feedback";

const defaultTitleProps: ModalProps["titleProps"] = { variant: "h4", component: "div", fontSize: undefined };

export const ImageCarouselModal = (props: PropsWithChildren<ImageCarouselModalProps>) => {
  const {
    trigger,
    triggerProps,
    showCloseIcon,
    CloseIcon,
    fullWidth = true,
    fullScreen,
    maxWidth = "md",
    draggable,
    responsive = true,
    breakpoint,
    title = "图片预览",
    titleProps = defaultTitleProps,
    modalProps,
    open,
    onClose,
    images: imagesProps,
    ...restProps
  } = props;
  const [images, setImages] = useSafeState<ImageItem[]>([]);
  const fetchImages = useMemoizedFn(async () => {
    if (typeof imagesProps === "function") {
      const res = await imagesProps();
      setImages(res || []);
    } else if (Array.isArray(imagesProps)) {
      if (imagesProps.length) {
        const imgs = [];
        for (let i = 0; i < imagesProps.length; i++) {
          const item = imagesProps[i];
          const imgItem = typeof item === "function" ? await item() : item;
          imgs.push(imgItem);
        }
        setImages(imgs);
      } else {
        setImages([]);
      }
    } else {
      setImages(imagesProps ? [imagesProps] : []);
    }
  });
  useDeepCompareEffect(() => {
    fetchImages();
  }, [imagesProps]);
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
      cancelText="关闭"
      {...(modalProps || {})}
    >
      <ImageCarousel images={images} {...restProps} />
    </Modal>
  );
};
export interface ImageCarouselModalProps
  extends Partial<CarouselProps>,
    Pick<
      ModalProps,
      | "trigger"
      | "triggerProps"
      | "open"
      | "onClose"
      | "showCloseIcon"
      | "CloseIcon"
      | "maxWidth"
      | "draggable"
      | "responsive"
      | "breakpoint"
      | "fullScreen"
      | "fullWidth"
      | "title"
      | "titleProps"
    > {
  modalProps?: ModalProps;
  /** images的优先级低于children */
  images?: ImageItem[] | (() => ImageItem[]) | (() => ImageItem)[] | ImageItem;
}
