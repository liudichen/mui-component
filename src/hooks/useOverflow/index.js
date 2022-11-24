import { useEffect, useRef } from 'react';
import { useSafeState, useSize } from 'ahooks';

export const useOverflow = (threshold = 0, ratio = 1) => {
  const [ overflow, setOverflow ] = useSafeState(false);
  const containerRef = useRef();
  const contentRef = useRef();
  const containerSize = useSize(containerRef);
  const containerWidth = containerSize?.width;
  useEffect(() => {
    requestAnimationFrame(() => {
      const contentWidth = contentRef.current?.getBoundingClientRect()?.width;
      if (contentWidth && containerWidth && (containerWidth < contentWidth * ratio + threshold)) {
        if (!overflow) setOverflow(true);
      } else {
        if (overflow) setOverflow(false);
      }
    });
  }, [ containerWidth, ratio, threshold ]);

  return {
    overflow,
    containerRef,
    contentRef,
    containerWidth,
  };
};
