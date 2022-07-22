<!--
 * @Description: 
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-14 11:01:55
 * @LastEditTime: 2022-07-22 11:35:45
-->
# mui-formfield

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
