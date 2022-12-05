import smoothScrollIntoView, { SmoothBehaviorOptions } from 'smooth-scroll-into-view-if-needed';

/** 将窗口滚动到指定元素 */
export const scrollToElement = (element: Element, options :SmoothBehaviorOptions = { block: 'start' }) => {
  if (!element) return;
  smoothScrollIntoView(element, options);
};
