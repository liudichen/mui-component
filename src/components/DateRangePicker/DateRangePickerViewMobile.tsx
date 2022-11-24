/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import {
  PickersCalendarHeader,
  ExportedCalendarHeaderProps,
  useDefaultDates,
  useUtils,
  DayPicker,
  DayPickerProps,
  PickersCalendarHeaderSlotsComponent,
  PickersCalendarHeaderSlotsComponentsProps,
  DayValidationProps,
} from '@mui/x-date-pickers/internals';

import { DateRange } from './model_dateRange';
import { DateRangePickerDay } from './DateRangePickerDay';
import { ExportedDesktopDateRangeCalendarProps } from './DateRangePickerViewDesktop';
import { isWithinRange, isStartOfRange, isEndOfRange } from './date-utils';

export interface DateRangePickerViewMobileSlotsComponent
  extends PickersCalendarHeaderSlotsComponent {}

export interface DateRangePickerViewMobileSlotsComponentsProps
  extends PickersCalendarHeaderSlotsComponentsProps {}

export interface ExportedMobileDateRangeCalendarProps<TDate>
  extends Pick<ExportedDesktopDateRangeCalendarProps<TDate>, 'renderDay'> {}

interface DesktopDateRangeCalendarProps<TDate>
  extends ExportedMobileDateRangeCalendarProps<TDate>,
  Omit<DayPickerProps<TDate>, 'selectedDays' | 'renderDay' | 'onFocusedDayChange' | 'classes'>,
  DayValidationProps<TDate>,
  ExportedCalendarHeaderProps<TDate> {
  /**
   * Overrideable components.
   * @default {}
   */
  components?: Partial<DateRangePickerViewMobileSlotsComponent>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps?: Partial<DateRangePickerViewMobileSlotsComponentsProps>;
  parsedValue: DateRange<TDate>;
  changeMonth: (date: TDate) => void;
}

const onlyDayView = [ 'day' ] as const;

/**
 * @ignore - internal component.
 */
export function DateRangePickerViewMobile<TDate>(props: DesktopDateRangeCalendarProps<TDate>) {
  const {
    changeMonth,
    components,
    componentsProps,
    parsedValue,
    leftArrowButtonText,
    maxDate: maxDateProp,
    minDate: minDateProp,
    onSelectedDaysChange,
    renderDay = (_, dayProps) => <DateRangePickerDay<TDate> {...dayProps} />,
    rightArrowButtonText,
    disabled,
    readOnly,
    // excluding classes from `other` to avoid passing them down to children
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    classes: providedClasses,
    ...other
  } = props;

  const utils = useUtils<TDate>();
  const defaultDates = useDefaultDates<TDate>();
  const minDate = minDateProp ?? defaultDates.minDate;
  const maxDate = maxDateProp ?? defaultDates.maxDate;

  // When disable, limit the view to the selected range
  const [ start, end ] = parsedValue;
  const minDateWithDisabled = (disabled && start) || minDate;
  const maxDateWithDisabled = (disabled && end) || maxDate;

  return (
    <React.Fragment>
      <PickersCalendarHeader
        components={components}
        componentsProps={componentsProps}
        leftArrowButtonText={leftArrowButtonText}
        maxDate={maxDateWithDisabled}
        minDate={minDateWithDisabled}
        onMonthChange={changeMonth as any}
        openView="day"
        rightArrowButtonText={rightArrowButtonText}
        views={onlyDayView}
        disabled={disabled}
        {...other}
      />
      <DayPicker<TDate>
        {...other}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        readOnly={readOnly}
        selectedDays={parsedValue}
        onSelectedDaysChange={onSelectedDaysChange}
        onFocusedDayChange={() => {}}
        renderDay={(day, _, DayProps) =>
          renderDay(day, {
            isPreviewing: false,
            isStartOfPreviewing: false,
            isEndOfPreviewing: false,
            isHighlighting: isWithinRange(utils, day, parsedValue),
            isStartOfHighlighting: isStartOfRange(utils, day, parsedValue),
            isEndOfHighlighting: isEndOfRange(utils, day, parsedValue),
            ...DayProps,
          })
        }
      />
    </React.Fragment>
  );
}
