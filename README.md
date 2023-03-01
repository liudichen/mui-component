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
export * from './components/ContentCard';

export * from './components/PageContainer';

export * from './components/Modal/DraggablePaper';
// ====================================


// ============ 交互 ===============
export * from './components/PopConfirm';

export * from './components/Modal';

export * from './components/Popover';
// =============================


// ============ 展示 ==============
export * from './components/Loading';

export * from './components/Pagination';

export * from './components/DataGridTable';
export * from './components/DataGridTable/GridToolbars';

export * from './components/StatusRender';

export * from './components/SimpleTable';

export * from './components/ImageCarouselModal';

export * from './components/Result';

export * from './components/NoData';
// ===============================


// ======== Layout组件 ==========

export * from './components/GridLayout';

export * from './components/ScrollToTop';
// ==========================


// ============= viewer ===============
export * from './components/PdfModalViewer';

export * from './components/ImageModalViewer';

export * from './components/VideoModalViewer';

export * from './components/AttachmentViewer';

export * from './components/AttachmentModalViewer';
// =========================================
```

Build documentation,

```bash
$ npm run docs:build
```

Run test,

```bash
$ npm test
```

Build library via `father-build`,

```bash
$ npm run build
```
