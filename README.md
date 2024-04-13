# mui-component

[![NPM version](https://img.shields.io/npm/v/mui-component.svg?style=flat)](https://npmjs.org/package/mui-component)
[![NPM downloads](http://img.shields.io/npm/dm/mui-component.svg?style=flat)](https://npmjs.org/package/mui-component)

一些自用的组件。

## Getting Started

Install dependencies,

```bash
$ npm i mui-component
```


## Components
被导出的组件(及其Prop的interface)有:

```javascript
// ================容器组件==================
export * from './components/container/ContentCard';

export * from './components/container/PageContainer';

export * from './components/container/DraggablePaperRender';
// ====================================


// ============ 交互 ===============
export * from './components/feedback/PopConfirm';

export * from './components/feedback/Modal';

export * from './components/feedback/Popover';

export * from './components/feedback/Loading';
// =============================


// ============ 展示 ==============
export * from './components/display/Pagination';
export * from './components/display/DataGridTable';
export * from './components/display/DataGridTable/GridToolbars';
export * from './components/display/StatusRender';
export * from './components/display/SimpleTable';
export * from './components/display/ImageCarouselModal';
export * from './components/display/Result';
export * from './components/display/NoData';
// ===============================


// ======== Layout组件 ==========

export * from './components/layout/GridLayout';

export * from './components/layout/ScrollToTop';
// ==========================


// ============= viewer ===============
export * from './components/viewer/PdfModalViewer';

export * from './components/viewer/ImageModalViewer';

export * from './components/viewer/VideoModalViewer';

export * from './components/viewer/AttachmentViewer';

export * from './components/viewer/AttachmentModalViewer';
// =========================================
```

