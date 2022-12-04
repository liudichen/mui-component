import React from 'react';
import { CarouselProps as ICarouselProps } from 'react-responsive-carousel';

export interface ImageItem {
  src?: string,
  title?: string,
  name?: string,
  url?: string,
}

export interface CarouselProps extends ICarouselProps {
  /** Define the aria-label attribute for the root carousel element. The default is undefined, skipping the attribute from markup. */
  ariaLabel?: string,
  /** Define the direction of the slider
   * @default 'horizontal'
  */
  axis?: 'horizontal' | 'vertical',
  autoFocus?: boolean,
  /** Change the slide automatically based on interval prop. */
  autoPlay?: boolean,
  /** Center the current item and set the slide width based on centerSlidePercentage. */
  centerMode?: boolean,
  /** Define the width percentage relative to the carousel width when centerMode is true */
  centerSlidePercentage?: number,
  /** The height of the items will not be fixed */
  dynamicHeight?: boolean,
  /** Enable swipe on non-touch screens when swipeable is true */
  emulateTouch?: boolean,
  infiniteLoop?: boolean,
  /** Interval in milliseconds to automatically go to the next item when autoPlay is true
   * @default 3000
   */
  interval?: number,
  /** Apply aria-label on carousel with an object with the properties leftArrow, rightArrow and item.
   * @default {leftArrow: 'previous slide / item', rightArrow: 'next slide / item', item: 'slide item'}
   */
  labels?: {
    leftArrow?: string,
    rightArrow?: string,
    item?: string,
  },
  /** Callback to handle a click event on a slide, receives the current index and item as arguments */
  onClickItem?: (index: number, item: React.ReactNode) => void,
  /** Callback to handle a click event on a thumb, receives the current index and item as arguments. */
  onClickThumb?: (index: number, item: React.ReactNode) => void,
  /** Callback to handle every time the selected item changes, receives the current index and item as arguments. */
  onChange?: (index: number, item: React.ReactNode) => void,
  /** Callback to handle when the swipe starts, receives a touch event as argument */
  onSwipeStart?: (event: React.TouchEvent) => void,
  /** Callback to handle when the swipe ends, receives a touch event as argument. */
  onSwipeEnd?: (event: React.TouchEvent) => void,
  /** Callback triggered on every movement while swiping, receives a touch event as argument */
  onSwipeMove?: (event: React.TouchEvent) => void,
  /** Don't let the carousel scroll until the user swipe to the value specified on swipeScrollTolerance */
  preventMovementUntilSwipeScrollTolerance?: boolean,
  /** Render custom previous arrow. Receives a click handler, a boolean that shows if there's a previous item, and the accessibility label as arguments. */
  renderArrowPrev?: (clickHandler: () => void, hasPrevious: boolean, label: string) => React.ReactNode,
  /** Render custom previous arrow. Receives a click handler, a boolean that shows if there's a next item, and the accessibility label as arguments. */
  renderArrowNext?: (clickHandler: () => void, hasNext: boolean, label: string) => React.ReactNode,
  /** Render custom indicator. Receives a click handler, a boolean that shows if the item is selected, the item index, and the accessibility label as arguments.*/
  renderIndicator?: (clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void, isSelected: boolean, index: number, label: string) => React.ReactNode,
  /** Render a custom item. Receives an item of the carousel, and an object with the isSelected property as arguments. */
  renderItem?: (item: React.ReactNode, options?: {
    isSelected: boolean;
    isPrevious: boolean;
  }) => React.ReactNode,
  /** Render prop to show the thumbs, receives the carousel items as argument. Get the img tag of each item of the slider, and render it by default. */
  renderThumbs?: (children: React.ReactChild[]) => React.ReactChild[],
  /** Set the selected item
   * @default 0
   */
  selectedItem?: number,
  /** Enable previous and next arrow
   * @default true
   */
  showArrows?: boolean,
  /** Enable status of the current item to the total
   * @default true
   */
  showStatus?: boolean,
  /** Enable indicators to select items
   * @default true
   */
  showIndicators?: boolean,
  /** Enable thumbs
   * @default true
   */
  showThumbs?: boolean,
  /** Formatter that returns the status as a string, receives the current item and the total count as arguments. Defaults to {currentItem} of {total} format.*/
  statusFormatter?: (currentItem: number, total: number) => string,
  /** The slide will not change by autoPlay on hover
   * @default true
   */
  stopOnHover?: boolean,
  /** Enable the user to swipe the carousel
   * @default true
   */
  swipeable?: boolean,
  /** How many pixels it's needed to change the slide when swiping
   * @default 5
   */
  swipeScrollTolerance?: number,
  /** Width of the thumb
   * @default 80
  */
  thumbWidth?: number,
  /** Duration of the animation of changing slides. */
  transitionTime?: number,
  /** Enable the arrows to move the slider when focused. */
  useKeyboardArrows?: boolean,
  /** Set the mode of swipe when the axis is 'vertical'
   * @default 'standard'
   */
  verticalSwipe?: 'natural' | 'standard',
  width?: number | string,
}

export interface ImageCarouselProps extends CarouselProps {
  /** images的优先级低于children */
  images?: ImageItem[],
}

/** 图片展示组件 */
export declare const ImageCarousel: React.FC<React.PropsWithChildren<ImageCarouselProps>>;
