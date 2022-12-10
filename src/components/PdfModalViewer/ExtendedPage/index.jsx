import { useEffect, useRef } from 'react';
import { useInViewport } from 'ahooks';
import { Page } from 'react-pdf';

export const ExtendedPage = (props) => {
  const { pageNumber, inViewRef, rootRef, handlePageChange, updatePageOnScroll, ...restProps } = props;
  const ref = useRef();
  const [ , ratio ] = useInViewport(updatePageOnScroll ? ref : null, { threshold: [ 0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.55 ], root: rootRef });
  useEffect(() => {
    if (updatePageOnScroll) {
      inViewRef.current = {
        ...inViewRef.current || {},
        [pageNumber]: ratio,
      };
      const entries = Object.entries(inViewRef.current);
      const overHalf = entries.filter((ele) => ele[1] >= 0.5).map((ele) => +ele[0]);
      let newPageNumber = pageNumber;
      if (overHalf.length) {
        newPageNumber = Math.min(...overHalf);
      } else {
        let max = 0;
        for (let i = 0; i < entries.length; i++) {
          const [ num, rt ] = entries[i];
          if (rt > max) {
            max = rt;
            newPageNumber = +num;
          }
        }
      }
      if (newPageNumber !== pageNumber) {
        handlePageChange?.(newPageNumber, false);
      }
    }
  }, [ ratio, pageNumber, handlePageChange, updatePageOnScroll ]);
  return (
    <Page
      inputRef={ref}
      pageNumber={pageNumber}
      {...restProps}
    />
  );
};

ExtendedPage.displayName = 'iimm.Mui.PdfModalViewer.ExtendedPage';
