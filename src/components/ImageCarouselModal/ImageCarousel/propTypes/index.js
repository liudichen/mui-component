/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-11 22:34:27
 * @LastEditTime: 2022-04-11 22:34:27
 */
import PropTypes from 'prop-types';

const carousel = {
  ariaLabel: PropTypes.string, // Define the aria-label attribute for the root carousel element. The default is undefined, skipping the attribute from markup.
  axis: PropTypes.oneOf([ 'horizontal', 'vertical' ]), // Define the direction of the slider, defaults to 'horizontal'.
  autoFocus: PropTypes.bool,
  autoPlay: PropTypes.bool, // Change the slide automatically based on interval prop.
  centerMode: PropTypes.bool, // Center the current item and set the slide width based on centerSlidePercentage.
  centerSlidePercentage: PropTypes.number, // Define the width percentage relative to the carousel width when centerMode is true
  dynamicHeight: PropTypes.bool, // The height of the items will not be fixed.
  emulateTouch: PropTypes.bool, // Enable swipe on non-touch screens when swipeable is true.
  infiniteLoop: PropTypes.bool,
  interval: PropTypes.number, // Interval in milliseconds to automatically go to the next item when autoPlay is true, defaults to 3000.
  labels: PropTypes.shape({
    leftArrow: PropTypes.string,
    rightArrow: PropTypes.string,
    item: PropTypes.string,
  }), //	Apply aria-label on carousel with an object with the properties leftArrow, rightArrow and item. The default is {leftArrow: 'previous slide / item', rightArrow: 'next slide / item', item: 'slide item'}.
  onClickItem: PropTypes.func, // Callback to handle a click event on a slide, receives the current index and item as arguments.
  onClickThumb: PropTypes.func, // Callback to handle a click event on a thumb, receives the current index and item as arguments.
  onChange: PropTypes.func, // Callback to handle every time the selected item changes, receives the current index and item as arguments.
  onSwipeStart: PropTypes.func, // Callback to handle when the swipe starts, receives a touch event as argument.
  onSwipeEnd: PropTypes.func, // Callback to handle when the swipe ends, receives a touch event as argument.
  onSwipeMove: PropTypes.func, // Callback triggered on every movement while swiping, receives a touch event as argument.
  preventMovementUntilSwipeScrollTolerance: PropTypes.bool, // Don't let the carousel scroll until the user swipe to the value specified on swipeScrollTolerance.
  renderArrowPrev: PropTypes.func, // Render custom previous arrow. Receives a click handler, a boolean that shows if there's a previous item, and the accessibility label as arguments.
  renderArrowNext: PropTypes.func, // Render custom previous arrow. Receives a click handler, a boolean that shows if there's a next item, and the accessibility label as arguments.
  renderIndicator: PropTypes.func, // Render custom indicator. Receives a click handler, a boolean that shows if the item is selected, the item index, and the accessibility label as arguments.
  renderItem: PropTypes.func, // Render a custom item. Receives an item of the carousel, and an object with the isSelected property as arguments.
  renderThumbs: PropTypes.func, // Render prop to show the thumbs, receives the carousel items as argument. Get the img tag of each item of the slider, and render it by default.
  selectedItem: PropTypes.number, // Set the selected item, defaults to 0.
  showArrows: PropTypes.bool, // Enable previous and next arrow, defaults to true.
  showStatus: PropTypes.bool, // Enable status of the current item to the total, defaults to true.
  showIndicators: PropTypes.bool, // Enable indicators to select items, defaults to true.
  showThumbs: PropTypes.bool, // Enable thumbs, defaults to true.
  statusFormatter: PropTypes.func, // Formatter that returns the status as a string, receives the current item and the total count as arguments. Defaults to {currentItem} of {total} format.
  stopOnHover: PropTypes.bool, // The slide will not change by autoPlay on hover, defaults to true.
  swipeable: PropTypes.bool, // Enable the user to swipe the carousel, defaults to true.
  swipeScrollTolerance: PropTypes.number, // How many pixels it's needed to change the slide when swiping, defaults to 5.
  thumbWidth: PropTypes.number, // Width of the thumb, defaults to 80.
  transitionTime: PropTypes.number, // Duration of the animation of changing slides.
  useKeyboardArrows: PropTypes.bool, // Enable the arrows to move the slider when focused.
  verticalSwipe: PropTypes.oneOf([ 'natural', 'standard' ]), // Set the mode of swipe when the axis is 'vertical'. The default is 'standard'.
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]), // The width of the carousel, defaults to 100%.
};

export default carousel;
