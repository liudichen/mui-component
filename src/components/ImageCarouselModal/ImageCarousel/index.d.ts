/* eslint-disable @typescript-eslint/ban-types */
/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 16:07:25
 * @LastEditTime: 2022-06-13 17:52:51
 */
import React from 'react';

export interface imageItem {
  src?: string,
  title?: string,
  name?: string,
  url?: string,
}
interface labels {
  leftArrow?: string,
  rightArrow?: string,
  item?: string,
}

export interface carouselProps {
  ariaLabel?: string, // Define the aria-label attribute for the root carousel element. The default is undefined, skipping the attribute from markup.
  axis?: 'horizontal' | 'vertical', // Define the direction of the slider, defaults to 'horizontal'.
  autoFocus?: boolean,
  autoPlay?: boolean, // Change the slide automatically based on interval prop.
  centerMode?: boolean, // Center the current item and set the slide width based on centerSlidePercentage.
  centerSlidePercentage?: number, // Define the width percentage relative to the carousel width when centerMode is true
  dynamicHeight?: boolean, // The height of the items will not be fixed.
  emulateTouch?: boolean, // Enable swipe on non-touch screens when swipeable is true.
  infiniteLoop?: boolean,
  interval?: number, // Interval in milliseconds to automatically go to the next item when autoPlay is true, defaults to 3000.
  labels?: labels, //	Apply aria-label on carousel with an object with the properties leftArrow, rightArrow and item. The default is {leftArrow: 'previous slide / item', rightArrow: 'next slide / item', item: 'slide item'}.
  onClickItem?: (index: number, item: any) => void, // Callback to handle a click event on a slide, receives the current index and item as arguments.
  onClickThumb?: (index: number, item: any) => void, // Callback to handle a click event on a thumb, receives the current index and item as arguments.
  onChange?: (index: number, item: any) => void, // Callback to handle every time the selected item changes, receives the current index and item as arguments.
  onSwipeStart?: (e:Event) => void, // Callback to handle when the swipe starts, receives a touch event as argument.
  onSwipeEnd?: (e:Event) => void, // Callback to handle when the swipe ends, receives a touch event as argument.
  onSwipeMove?: (e:Event) => void, // Callback triggered on every movement while swiping, receives a touch event as argument.
  preventMovementUntilSwipeScrollTolerance?: boolean, // Don't let the carousel scroll until the user swipe to the value specified on swipeScrollTolerance.
  renderArrowPrev?: (clickHandler: Function, hasPrevious: boolean, label: any) => React.ReactNode, // Render custom previous arrow. Receives a click handler, a boolean that shows if there's a previous item, and the accessibility label as arguments.
  renderArrowNext?: (clickHandler: Function, hasNext: boolean, label: any) => React.ReactNode, // Render custom previous arrow. Receives a click handler, a boolean that shows if there's a next item, and the accessibility label as arguments.
  renderIndicator?: (clickHandler: Function, selected: boolean, index:number, label: any) => React.ReactNode, // Render custom indicator. Receives a click handler, a boolean that shows if the item is selected, the item index, and the accessibility label as arguments.
  renderItem?: (item: any, selectedObject: object) => React.ReactNode, // Render a custom item. Receives an item of the carousel, and an object with the isSelected property as arguments.
  renderThumbs?: (items: any[]) => any, // Render prop to show the thumbs, receives the carousel items as argument. Get the img tag of each item of the slider, and render it by default.
  selectedItem?: number, // Set the selected item, defaults to 0.
  showArrows?: boolean, // Enable previous and next arrow, defaults to true.
  showStatus?: boolean, // Enable status of the current item to the total, defaults to true.
  showIndicators?: boolean, // Enable indicators to select items, defaults to true.
  showThumbs?: boolean, // Enable thumbs, defaults to true.
  statusFormatter?: (item: any, total:number) => any, // Formatter that returns the status as a string, receives the current item and the total count as arguments. Defaults to {currentItem} of {total} format.
  stopOnHover?: boolean, // The slide will not change by autoPlay on hover, defaults to true.
  swipeable?: boolean, // Enable the user to swipe the carousel, defaults to true.
  swipeScrollTolerance?: number, // How many pixels it's needed to change the slide when swiping, defaults to 5.
  thumbWidth?: number, // Width of the thumb, defaults to 80.
  transitionTime?: number, // Duration of the animation of changing slides.
  useKeyboardArrows?: boolean, // Enable the arrows to move the slider when focused.
  verticalSwipe?: 'natural' | 'standard', // Set the mode of swipe when the axis is 'vertical'. The default is 'standard'.
  width?: number | string,
}

export interface ImageCarouselProps extends carouselProps {
  images: imageItem[],
}

declare const ImageCarousel: React.FunctionComponent<ImageCarouselProps>;

export default ImageCarousel;
