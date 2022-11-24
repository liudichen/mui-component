interface IRef {
  current?: HTMLElement,
}

interface Result {
  overflow: boolean,
  containerRef: IRef,
  contentRef: IRef
  containerWidth?: number
}

export declare const useOverflow: (threshold?: number, ratio?: number) => Result;
