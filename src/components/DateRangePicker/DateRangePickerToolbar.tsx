import React from 'react';
import { Typography } from '@mui/material';
import { styled, useThemeProps } from '@mui/material/styles';
import {
  PickersToolbar,
  PickersToolbarButton,
  pickersToolbarClasses,
  useUtils,
  BaseToolbarProps,
  useLocaleText,
} from '@mui/x-date-pickers/internals';

import { generateUtilityClass, generateUtilityClasses, composeClasses } from '../mui-utils';
import { DateRange, CurrentlySelectingRangeEndProps } from './model_dateRange';

export interface DateRangePickerToolbarClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the container element. */
  container: string;
}

export type DateRangePickerToolbarClassKey = keyof DateRangePickerToolbarClasses;

export function getDateRangePickerToolbarUtilityClass(slot: string) {
  return generateUtilityClass('MuiDateRangePickerToolbar', slot);
}

export const dateRangePickerToolbarClasses: DateRangePickerToolbarClasses = generateUtilityClasses(
  'MuiDateRangePickerToolbar',
  [ 'root', 'container' ],
);

const useUtilityClasses = (ownerState: DateRangePickerToolbarProps<any>) => {
  const { classes } = ownerState;
  const slots = {
    root: [ 'root' ],
    container: [ 'container' ],
  };

  return composeClasses(slots, getDateRangePickerToolbarUtilityClass, classes);
};

export interface DateRangePickerToolbarProps<TDate>
  extends CurrentlySelectingRangeEndProps,
  Pick<
  BaseToolbarProps<TDate, DateRange<TDate>>,
  | 'isMobileKeyboardViewOpen'
  | 'toggleMobileKeyboardView'
  | 'toolbarTitle'
  | 'toolbarFormat'
  | 'parsedValue'
  > {
  startText: React.ReactNode;
  endText: React.ReactNode;
  classes?: Partial<DateRangePickerToolbarClasses>;
}

const DateRangePickerToolbarRoot = styled(PickersToolbar, {
  name: 'MuiDateRangePickerToolbar',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root,
})<{
  ownerState: DateRangePickerToolbarProps<any>;
}>({
  [`& .${pickersToolbarClasses.penIconButton}`]: {
    position: 'relative',
    top: 4,
  },
});

const DateRangePickerToolbarContainer = styled('div', {
  name: 'MuiDateRangePickerToolbar',
  slot: 'Container',
  overridesResolver: (_, styles) => styles.container,
})({
  display: 'flex',
});

/**
 * @ignore - internal component.
 */
export const DateRangePickerToolbar = React.forwardRef(function DateRangePickerToolbar<
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
  TDate extends unknown,
>(inProps: DateRangePickerToolbarProps<TDate>, ref: React.Ref<HTMLDivElement>) {
  const utils = useUtils<TDate>();
  const props = useThemeProps({ props: inProps, name: 'MuiDateRangePickerToolbar' });

  const {
    currentlySelectingRangeEnd,
    parsedValue: [ start, end ],
    endText,
    isMobileKeyboardViewOpen,
    setCurrentlySelectingRangeEnd,
    startText,
    toggleMobileKeyboardView,
    toolbarFormat,
    toolbarTitle: toolbarTitleProp,
  } = props;

  const localeText = useLocaleText();
  const toolbarTitle = toolbarTitleProp ?? localeText.dateRangePickerDefaultToolbarTitle;

  const startDateValue = start
    ? utils.formatByString(start, toolbarFormat || utils.formats.shortDate)
    : startText;

  const endDateValue = end
    ? utils.formatByString(end, toolbarFormat || utils.formats.shortDate)
    : endText;

  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  return (
    <DateRangePickerToolbarRoot
      toolbarTitle={toolbarTitle}
      isMobileKeyboardViewOpen={isMobileKeyboardViewOpen}
      toggleMobileKeyboardView={toggleMobileKeyboardView}
      isLandscape={false}
      className={classes.root}
      ownerState={ownerState}
      ref={ref}
    >
      <DateRangePickerToolbarContainer className={classes.container}>
        <PickersToolbarButton
          variant={start !== null ? 'h5' : 'h6'}
          value={startDateValue}
          selected={currentlySelectingRangeEnd === 'start'}
          onClick={() => setCurrentlySelectingRangeEnd('start')}
        />
        <Typography variant="h5">&nbsp;{'–'}&nbsp;</Typography>
        <PickersToolbarButton
          variant={end !== null ? 'h5' : 'h6'}
          value={endDateValue}
          selected={currentlySelectingRangeEnd === 'end'}
          onClick={() => setCurrentlySelectingRangeEnd('end')}
        />
      </DateRangePickerToolbarContainer>
    </DateRangePickerToolbarRoot>
  );
});
