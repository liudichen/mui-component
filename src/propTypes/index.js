/*
 * @Description: 通用propTypes
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-14 11:33:16
 * @LastEditTime: 2022-05-09 21:03:22
 */
import PropTypes from 'prop-types';

const sx = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.func, PropTypes.object, PropTypes.bool ])),
  PropTypes.func,
  PropTypes.object,
]);


const dataGridPropTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string,
      title: PropTypes.string, // 可以替代headerName，
      description: PropTypes.string,
      align: PropTypes.oneOf([ 'left', 'center', 'right' ]),
      headerAlign: PropTypes.oneOf([ 'left', 'center', 'right' ]),
      titleAlign: PropTypes.oneOf([ 'left', 'center', 'right' ]),
      width: PropTypes.number,
      minWidth: PropTypes.number,
      maxWidth: PropTypes.number,
      flex: PropTypes.number,
      hideable: PropTypes.bool, // 是否可手动隐藏
      hideSortIcons: PropTypes.bool,
      sortable: PropTypes.bool, // true
      sortingOrder: PropTypes.arrayOf(PropTypes.oneOf([ 'asc', 'desc', null, undefined ])),
      sortComparator: PropTypes.func,
      disableReorder: PropTypes.bool, // 是否禁止列排序(Pro功能)
      disableColumnMenu: PropTypes.bool,
      disableExport: PropTypes.bool,
      editable: PropTypes.bool,
      pinnable: PropTypes.bool, // true
      filterable: PropTypes.bool, // true
      filterOperators: PropTypes.object,
      type: PropTypes.oneOf([
        'string',
        'number',
        'date',
        'dateTime',
        'boolean',
        'singleSelect',
        'actions',

        'status', // 自定义的新增type
      ]), // 'string'
      statusColorConvert: PropTypes.func, // 自定义的用于 type='status'
      statusTypeConvert: PropTypes.func, // 自定义的用于 type='status'
      statusTextConvert: PropTypes.func, // 自定义的用于 type='status'
      statusConvert: PropTypes.func, // 自定义的用于 type='status'

      valueOptions: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.arrayOf(PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
          PropTypes.shape({
            value: PropTypes.any,
            label: PropTypes.string,
          }),
        ])),
      ]), // only need when type==='singleSelect'
      getActions: PropTypes.func, //  params:{value,row,..} => ReactNode[], only need when type==='actions'
      valueGetter: PropTypes.func, // params:{value,row,..} => any
      valueSetter: PropTypes.func, // params:{value,row,..} => {...parms.row, ...}
      valueFormatter: PropTypes.func, // params:{value,row,..} => any
      valueParser: PropTypes.func, // (value)=> any
      renderCell: PropTypes.func, // params:{value,row,...} => ReactNode
      renderEditCell: PropTypes.func, // params:{value,row,...} => ReactNode
      renderHeader: PropTypes.func, // params:{value,row,...} => ReactNode
      renderTitle: PropTypes.func, // params:{value,row,...} => ReactNode
      headerClassName: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]),
      titleClassName: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]),
      cellClassName: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]),
      colSpan: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.func, // params:{value,row,..} => number | undefined
      ]),
    })
  ).isRequired,

  autoHeight: PropTypes.bool, // <false> If true, the grid height is dynamic and follow the number of rows in the grid.

  autoPageSize: PropTypes.bool, // <false>	If true, the pageSize is calculated according to the container size and the max number of rows to avoid rendering a vertical scroll bar.

  checkboxSelection: PropTypes.bool, // <false> If true, the grid get a first column with a checkbox that allows to select rows.

  classes: PropTypes.object, // Override or extend the styles applied to the component

  columnBuffer: PropTypes.number, // <3> Number of extra columns to be rendered before/after the visible slice

  columnThreshold: PropTypes.number, // <3>Number of rows from the columnBuffer that can be visible before a new slice is rendered

  columnTypes: PropTypes.object, // Extend native column types with your new column types

  columnVisibilityModel: PropTypes.object, // Set the column visibility model of the grid. If defined, the grid will ignore the hide property in GridColDef

  components: PropTypes.object, // Overrideable components.

  componentsProps: PropTypes.object, // Overrideable components props dynamically passed to the component at rendering

  density: PropTypes.oneOf([ 'standard', 'comfortable', 'compact' ]),

  disableColumnFilter: PropTypes.bool, // <false> If true, column filters are disabled

  disableColumnMenu: PropTypes.bool, // <false> If true, the column menu is disabled

  disableColumnSelector: PropTypes.bool, // If true, hiding/showing columns is disabled

  disableDensitySelector: PropTypes.bool, // If true, the density selector is disabled

  disableExtendRowFullWidth: PropTypes.bool, // If true, rows will not be extended to fill the full width of the grid container

  disableSelectionOnClick: PropTypes.bool, // If true, the selection on click on a row or cell is disabled

  disableVirtualization: PropTypes.bool, // If true, the virtualization is disabled

  editMode: PropTypes.oneOf([ 'cell', 'row' ]), // Controls whether to use the cell or row editing

  editRowsModel: PropTypes.object, // editRowsModel

  error: PropTypes.bool,

  experimentalFeatures: PropTypes.shape({ preventCommitWhileValidating: PropTypes.bool }), // Features under development. For each feature, if the flag is not explicitly set to true, the feature will be fully disabled and any property / method call will not have any effect

  filterMode: PropTypes.oneOf([ 'client', 'server' ]), // Filtering can be processed on the server or client-side. Set it to 'server' if you would like to handle filtering on the server-side

  filterModel: PropTypes.shape({
    // Set the filter model of the grid.
    items: PropTypes.arrayOf(
      PropTypes.shape({
        columnField: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
        operatorValue: PropTypes.string,
        value: PropTypes.any,
      })
    ).isRequired,
    linkOperator: PropTypes.oneOf([ 'and', 'or' ]),
  }),

  /**
   * @description (params: GridCellParams) => string  Function that applies CSS classes dynamically on cells:
   * @param {* GridCellParams} params With all properties from GridCellParams.
   * @return {*String}  The CSS class to apply to the cell
   */
  getCellClassName: PropTypes.func,

  /**
   * @description (params: GridRowParams) => JSX.Element  Function that returns the element to render in row detail
   * @param {*GridRowParams} params With all properties from GridRowParams
   * @return {*Element}   The row detail element.
   */
  getDetailPanelContent: PropTypes.func,

  /**
   * @description (params: GridRowParams) => string   Function that applies CSS classes dynamically on rows
   * @param {*GridRowParams} params  With all properties from GridRowParams
   * @return {*String}  The CSS class to apply to the row
   */
  getRowClassName: PropTypes.func,

  /**
   * @description (params: GridRowHeightParams) => GridRowHeightReturnValue   Function that sets the row height per row
   * @param {*GridRowHeightParams} params  With all properties from GridRowHeightParams
   * @return {*}  The row height value. If null or undefined then the default row height is applied
   */

  getRowHeight: PropTypes.func,

  getRowId: PropTypes.func, // Return the id of a given GridRowModel

  headerHeight: PropTypes.number, // <56> Set the height in pixel of the column headers in the grid

  hideFooter: PropTypes.bool, // If true, the footer component is hidden

  hideFooterPagination: PropTypes.bool, // If true, the pagination component in the footer is hidden

  hideFooterSelectedRowCount: PropTypes.bool, // If true, the selected row count in the footer is hidden

  initialState: PropTypes.object, // The initial state of the DataGrid. The data in it will be set in the state on initialization but will not be controlled. If one of the data in initialState is also being controlled, then the control state wins

  /**
   * @description (params: GridCellParams) => boolean   Callback fired when a cell is rendered, returns true if the cell is editable
   * @param {*GridCellParams} params  With all properties from GridCellParams
   * @return {*Boolen}  A boolean indicating if the cell is editable
   */
  isCellEditable: PropTypes.func,

  /**
   * @description (params: GridRowParams) => boolean  Determines if a row can be selected
   * @param {*GridRowParams} params With all properties from GridRowParams.
   * @return {*Boolen}  A boolean indicating if the cell is selectable
   */
  isRowSelectable: PropTypes.func,

  loading: PropTypes.bool, // If true, a loading overlay is displayed

  localeText: PropTypes.object, // Set the locale text of the grid. You can find all the translation keys supported in the source in the GitHub repository

  logger: PropTypes.shape({
    debug: PropTypes.func,
    error: PropTypes.func,
    info: PropTypes.func,
    warn: PropTypes.func,
  }), // <console>  Pass a custom logger in the components that implements the Logger interface

  logLevel: PropTypes.oneOf([ 'debug', 'error', 'info', 'warn', false ]), // Allows to pass the logging level or false to turn off logging.

  nonce: PropTypes.string, // Nonce of the inline styles for Content Security Policy

  /**
   * @description (params: GridCellParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void   Callback fired when any cell is clicked
   * @param {GridCellParams} params  With all properties from GridCellParams
   * @param {React.MouseEvent} event
   * @param {GridCellParams} detais Additional details for this callback
   * @return {*} void
   */
  onCellClick: PropTypes.func,

  /**
   * @description (params: GridCellParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void   Callback fired when a double click event comes from a cell element
   * @param {GridCellParams} params With all properties from GridCellParams
   * @param {React.MouseEvent} event
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onCellDoubleClick: PropTypes.func,

  /**
   * @description (params: GridCellEditCommitParams, event: MuiEvent<MuiBaseEvent>, details: GridCallbackDetails) => void   Callback fired when the cell changes are committed
   * @param {GridCellCommitParams} params With all properties from GridCellEditCommitParams
   * @param {MuiBaseEvent} event  The event that caused this prop to be called
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onCellEditCommit: PropTypes.func,

  /**
   * @description (params: GridCellParams, event: MuiEvent<React.KeyboardEvent | React.MouseEvent>) => void   Callback fired when the cell turns to edit mode
   * @param {GridCellParams} params With all properties from GridCellParams
   * @param {React.KeyboardEvent | React.MouseEvent} event
   * @return {*} void
   */
  onCellEditStart: PropTypes.func,

  /**
   * @description (params: GridCellParams, event: MuiEvent<MuiBaseEvent>) => void  Callback fired when the cell turns to view mode
   * @param {GridCellParams} params With all properties from GridCellParams
   * @param {MuiBaseEvent} event
   * @return {*} void
   */
  onCellEditStop: PropTypes.func,

  /**
   * @description (params: GridCellParams, event: MuiEvent<MuiBaseEvent>, details: GridCallbackDetails) => void  Callback fired when a cell loses focus
   * @param {GridCellParams} params With all properties from GridCellParams
   * @param {MuiBaseEvent} event  The event object
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {} void
   */
  onCellFocusOut: PropTypes.func,

  /**
   * @description (params: GridCellParams, event: MuiEvent<React.KeyboardEvent>, details: GridCallbackDetails) => void  Callback fired when a keydown event comes from a cell element
   * @param {GridCellParams} params With all properties from GridCellParams
   * @param {React.KeyboardEvent} event  The event object
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onCellKeyDown: PropTypes.func,

  /**
   * @description (params: GridColumnHeaderParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void  Callback fired when a click event comes from a column header element
   * @param {GridColumnHeaderParams} params With all properties from GridColumnHeaderParams
   * @param {React.MouseEvent} event  The event object
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onColumnHeaderClick: PropTypes.func,

  /**
   * @description (params: GridColumnHeaderParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void  Callback fired when a double click event comes from a column header element
   * @param {GridColumnHeaderParams} params With all properties from GridColumnHeaderParams
   * @param {React.MouseEvent} event  The event object
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onColumnHeaderDoubleClick: PropTypes.func,

  /**
   * @description function(params: GridColumnHeaderParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void  	Callback fired when a mouse enter event comes from a column header element
   * @param {GridColumnHeaderParams} params With all properties from GridColumnHeaderParams
   * @param {React.MouseEvent} event  The event object
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onColumnHeaderEnter: PropTypes.func,

  /**
   * @description (params: GridColumnHeaderParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void   Callback fired when a mouse leave event comes from a column header element
   * @param {GridColumnHeaderParams} params With all properties from GridColumnHeaderParams
   * @param {React.MouseEvent} event  The event object
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onColumnHeaderLeave: PropTypes.func,

  /**
   * @description (params: GridColumnHeaderParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void   Callback fired when a mouseout event comes from a column header element
   * @param {GridColumnHeaderParams} params With all properties from GridColumnHeaderParams
   * @param {React.MouseEvent} event  The event object
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onColumnHeaderOut: PropTypes.func,

  /**
   * @description (params: GridColumnHeaderParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void   Callback fired when a mouseover event comes from a column header element
   * @param {GridColumnHeaderParams} params With all properties from GridColumnHeaderParams
   * @param {React.MouseEvent} event  The event object
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onColumnHeaderOver: PropTypes.func,

  /**
   * @description (params: GridColumnOrderChangeParams, event: MuiEvent<{}>, details: GridCallbackDetails) => void  Callback fired when a column is reordered
   * @param {GridColumnOrderChangeParams} params   With all properties from GridColumnOrderChangeParams
   * @param {MuiEvent} event   The event object
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onColumnOrderChange: PropTypes.func,

  /**
   * @description (model: GridColumnVisibilityModel, details: GridCallbackDetails) => void  Callback fired when the column visibility model changes.
   * @param {GridColumnVisibilityModel} model The new model
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*}  void
   */
  onColumnVisibilityModelChange: PropTypes.func,

  /**
   * @description (editRowsModel: GridEditRowsModel, details: GridCallbackDetails) => void  Callback fired when the editRowsModel changes
   * @param {GridEditRowsModel} editRowsModel With all properties from GridEditRowsModel
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onEditRowsModelChange: PropTypes.func,

  /**
   * @description (args: any, event: MuiEvent<{}>, details: GridCallbackDetails) => void
Callback fired when an exception is thrown in the grid
   * @param {any} args The arguments passed to the showError call
   * @param {MuiEvent} event   The event object
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onError: PropTypes.func,

  /**
   * @description (model: GridFilterModel, details: GridCallbackDetails) => void  Callback fired when the Filter model changes before the filters are applied
   * @param {GridFilterModel} model With all properties from GridFilterModel.
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onFilterModelChange: PropTypes.func,

  /**
   * @description (page: number, details: GridCallbackDetails) => void  Callback fired when the current page has changed
   * @param {number} page Index of the page displayed on the Grid
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onPageChange: PropTypes.func,

  /**
   * @description (pageSize: number, details: GridCallbackDetails) => void  Callback fired when the page size has changed
   * @param {number} pageSize Size of the page displayed on the Grid
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onPageSizeChange: PropTypes.func,

  /**
   * @description (containerSize: ElementSize, event: MuiEvent<{}>, details: GridCallbackDetails) => void
   * @param {ElementSize} containerSize With all properties from ElementSize
   * @param {MuiEvent} event  The event object
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onResize: PropTypes.func,

  /**
   * @description (params: GridRowParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void  Callback fired when a row is clicked. Not called if the target clicked is an interactive element added by the built-in columns
   * @param {GridRowParams} params With all properties from RowParams.
   * @param {React.MouseEvent} event  The event object
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onRowClick: PropTypes.func,

  /**
   * @description (params: GridRowParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => void  	Callback fired when a double click event comes from a row container element
   * @param {GridRowParams} params With all properties from RowParams.
   * @param {React.MouseEvent} event  The event object
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onRowDoubleClick: PropTypes.func,

  /**
   * @description (id: GridRowId, event: MuiEvent<MuiBaseEvent>) => void  Callback fired when the row changes are committed.
   * @param {GridRowId} id The row id
   * @param {MuiBaseEvent} event The event that caused this prop to be called
   * @return {*} void
   */
  onRowEditCommit: PropTypes.func,

  /**
   * @description (params: GridRowParams, event: MuiEvent<React.KeyboardEvent | React.MouseEvent>) => void  Callback fired when the row turns to edit mode
   * @param {GridRowParams} params  With all properties from GridRowParams.
   * @param {React.KeyboardEvent | React.MouseEvent>} event The event that caused this prop to be called
   * @return {*} void
   */
  onRowEditStart: PropTypes.func,

  /**
   * @description (params: GridRowParams, event: MuiEvent<MuiBaseEvent>) => void  Callback fired when the row turns to view mode
   * @param {GridRowParams} params With all properties from GridRowParams
   * @param {MuiBaseEvent} event The event that caused this prop to be called.
   * @return {*} void
   */
  onRowEditStop: PropTypes.func,

  /**
   * @description (selectionModel: GridSelectionModel, details: GridCallbackDetails) => void  Callback fired when the selection state of one or multiple rows changes
   * @param {GridSelectionModel} selectionModel With all the row ids GridSelectionModel
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onSelectionModelChange: PropTypes.func,

  /**
   * @description (model: GridSortModel, details: GridCallbackDetails) => void  Callback fired when the sort model changes before a column is sorted.
   * @param {GridSortModel} model With all properties from GridSortModel
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onSortModelChange: PropTypes.func,

  /**
   * @description (state: GridState, event: MuiEvent<{}>, details: GridCallbackDetails) => void   Callback fired when the state of the grid is updated
   * @param {GridState} state The new state
   * @param {MuiEvent} event The event object
   * @param {GridCallbackDetails} details Additional details for this callback
   * @return {*} void
   */
  onStateChange: PropTypes.func,

  page: PropTypes.number, // <0> The zero-based index of the current page.

  pageSize: PropTypes.number, // <100> Set the number of rows in one page. If some of the rows have children (for instance in the tree data), this number represents the amount of top level rows wanted on each page

  paginationMode: PropTypes.oneOf([ 'client', 'server' ]), // Pagination can be processed on the server or client-side. Set it to 'client' if you would like to handle the pagination on the client-side. Set it to 'server' if you would like to handle the pagination on the server-side

  rowBuffer: PropTypes.number, // <3> Number of extra rows to be rendered before/after the visible slice

  rowCount: PropTypes.number, // Set the total number of rows, if it is different from the length of the value rows prop. If some rows have children (for instance in the tree data), this number represents the amount of top level rows

  rowHeight: PropTypes.number, // <52> Set the height in pixel of a row in the grid

  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number), // <[25, 50, 100]> Select the pageSize dynamically using the component UI

  rowThreshold: PropTypes.number, // <3> 	Number of rows from the rowBuffer that can be visible before a new slice is rendered.

  scrollbarSize: PropTypes.number, // Override the height/width of the grid inner scrollbar

  selectionModel: PropTypes.oneOfType([ PropTypes.number, PropTypes.string, PropTypes.array ]), // Set the selection model of the grid

  showCellRightBorder: PropTypes.bool, // If true, the right border of the cells are displayed

  showColumnRightBorder: PropTypes.bool, // If true, the right border of the column headers are displayed

  sortingMode: PropTypes.oneOf([ 'client', 'server' ]), // Sorting can be processed on the server or client-side. Set it to 'client' if you would like to handle sorting on the client-side. Set it to 'server' if you would like to handle sorting on the server-side

  sortingOrder: PropTypes.arrayOf(PropTypes.oneOf([ 'asc', 'desc', null ])), // <['asc', 'desc', null]> The order of the sorting sequence

  sortModel: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      sort: PropTypes.oneOf([ 'asc', 'desc' ]),
    })
  ), //	Set the sort model of the grid

  sx, // The system prop that allows defining system overrides as well as additional CSS styles. See the `sx` page for more details
};

const paginationPropTypes = {
  boundaryCount: PropTypes.number, // 1
  classes: PropTypes.object,
  color: PropTypes.oneOfType([
    PropTypes.oneOf([ 'standard', 'primary', 'secondary' ]),
    PropTypes.string,
  ]), // 'standard'
  onChange: PropTypes.func, // interface: (value) => void
  disabled: PropTypes.bool,
  hideNextButton: PropTypes.bool,
  hidePrevButton: PropTypes.bool,
  renderItem: PropTypes.bool, // (item) => <PaginationItem {...item} />
  shape: PropTypes.oneOf([ 'circular', 'rounded' ]), // 'circular'
  showFirstButton: PropTypes.bool,
  showLastButton: PropTypes.bool,
  siblingCount: PropTypes.number, // 1 当前页码前后总是显示的页码数量
  size: PropTypes.oneOfType([ PropTypes.oneOf([ 'medium', 'small', 'large' ]), PropTypes.string ]), // 'medium'
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.func, PropTypes.object, PropTypes.bool ])),
    PropTypes.func,
    PropTypes.object,
  ]),
  variant: PropTypes.oneOfType([ PropTypes.oneOf([ 'text', 'outlined' ]), PropTypes.string ]), // 'text'
};

const dialogPropTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The id(s) of the element(s) that describe the dialog.
   */
  'aria-describedby': PropTypes.string,

  /**
   * The id(s) of the element(s) that label the dialog.
   */
  'aria-labelledby': PropTypes.string,

  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   * @default styled(Backdrop, {
   *   name: 'MuiModal',
   *   slot: 'Backdrop',
   *   overridesResolver: (props, styles) => {
   *     return styles.backdrop;
   *   },
   * })({
   *   zIndex: -1,
   * })
   */
  BackdropComponent: PropTypes.elementType,

  /**
   * @ignore
   */
  BackdropProps: PropTypes.object,

  /**
   * Dialog children, usually the included sub-components.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: PropTypes.bool,

  /**
   * If `true`, the dialog is full-screen.
   * @default false
   */
  fullScreen: PropTypes.bool,

  /**
   * If `true`, the dialog stretches to `maxWidth`.
   *
   * Notice that the dialog width grow is limited by the default margin.
   * @default false
   */
  fullWidth: PropTypes.bool,

  /**
   * Determine the max-width of the dialog.
   * The dialog width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'sm'
   */
  maxWidth: PropTypes
  /* @typescript-to-proptypes-ignore */
    .oneOfType([ PropTypes.oneOf([ 'xs', 'sm', 'md', 'lg', 'xl', false ]), PropTypes.string ]),

  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick: PropTypes.func,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: PropTypes.func,

  /**
   * If `true`, the component is shown.
   */
  // open: PropTypes.bool.isRequired,

  /**
   * The component used to render the body of the dialog.
   * @default Paper
   */
  PaperComponent: PropTypes.elementType,

  /**
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   * @default {}
   */
  PaperProps: PropTypes.object,

  /**
   * Determine the container for scrolling the dialog.
   * @default 'paper'
   */
  scroll: PropTypes.oneOf([ 'body', 'paper' ]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.func, PropTypes.object, PropTypes.bool ])), PropTypes.func, PropTypes.object ]),

  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */
  TransitionComponent: PropTypes.elementType,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  transitionDuration: PropTypes.oneOfType([ PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number,
  }) ]),

  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: PropTypes.object,
};

export {
  sx,
  dataGridPropTypes,
  paginationPropTypes,
  dialogPropTypes,
};
