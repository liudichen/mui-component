# mui-formfield

[![NPM version](https://img.shields.io/npm/v/mui-componenti.svg?style=flat)](https://npmjs.org/package/mui-componenti)
[![NPM downloads](http://img.shields.io/npm/dm/mui-componenti.svg?style=flat)](https://npmjs.org/package/mui-componenti)

一些自用的组件。

## Getting Started

Install dependencies,

```bash
$ npm i mui-component
```


## Components
被导出的组件(及其Prop的interface)有:

```javascript
export { default as ContentCard, ContentCardProps } from './components/ContentCard';
export { default as PageContainer, PageContainerProps } from './components/PageContainer';
export { default as Loading, LoadingProps } from './components/Loading';
export { default as Pagination, PaginationProps } from './components/Pagination';
export { default as DataGridTable, DataGridPaginationProps, DataGridTableProps, columnType, initColumn } from './components/DataGridTable';
export { default as GridToolbarFty, GridToolbarFtyParams, GridToolbar } from './components/DataGridTable/GridToolbars';
export { default as StatusRender, StatusRenderProps } from './components/StatusRender';
export { default as SimpleTable, SimpleTableProps } from './components/SimpleTable';

export { default as PopConfirm, PopConfirmProps } from './components/PopConfirm';
export { default as Modal, ModalProps } from './components/Modal';

export { default as ImageCarouselModal, ImageCarousel, ImageCarouselProps, ImageCarouselModalProps } from './components/ImageCarouselModal';

export { default as Space, SpaceProps } from './components/Space';

export { default as Result, ResultProps } from './components/Result';
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
