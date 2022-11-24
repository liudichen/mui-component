/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  DesktopTooltipWrapper,
  usePickerState,
  DateInputPropsLike,
  DesktopWrapperProps,
  DesktopWrapperSlotsComponent,
  DesktopWrapperSlotsComponentsProps,
  DateInputSlotsComponent,
} from '@mui/x-date-pickers/internals';

import {
  DateRangePickerView,
  DateRangePickerViewSlotsComponent,
  DateRangePickerViewSlotsComponentsProps,
} from './DateRangePickerView';
import { DateRangePickerInput } from './DateRangePickerInput';
import { useDateRangeValidation } from './useDateRangeValidation';
import {
  BaseDateRangePickerProps,
  useDateRangePickerDefaultizedProps,
  dateRangePickerValueManager,
} from './shared';


const KeyboardDateInputComponent = DateRangePickerInput as unknown as React.FC<DateInputPropsLike>;

export interface DesktopDateRangePickerSlotsComponent
  extends DesktopWrapperSlotsComponent,
  DateRangePickerViewSlotsComponent,
  DateInputSlotsComponent {}

export interface DesktopDateRangePickerSlotsComponentsProps
  extends DesktopWrapperSlotsComponentsProps,
  DateRangePickerViewSlotsComponentsProps {}

export interface DesktopDateRangePickerProps<TInputDate, TDate>
  extends BaseDateRangePickerProps<TInputDate, TDate>,
  DesktopWrapperProps {
  /**
   * Overrideable components.
   * @default {}
   */
  components?: Partial<DesktopDateRangePickerSlotsComponent>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps?: Partial<DesktopDateRangePickerSlotsComponentsProps>;
}

type DesktopDateRangePickerComponent = (<TInputDate, TDate = TInputDate>(
  props: DesktopDateRangePickerProps<TInputDate, TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

export const DesktopDateRangePicker = React.forwardRef(function DesktopDateRangePicker<
  TInputDate,
  TDate = TInputDate,
>(inProps: DesktopDateRangePickerProps<TInputDate, TDate>, ref: React.Ref<HTMLDivElement>) {

  const props = useDateRangePickerDefaultizedProps<
  TInputDate,
  TDate,
  DesktopDateRangePickerProps<TInputDate, TDate>
  >(inProps, 'MuiDesktopDateRangePicker');

  const [ currentlySelectingRangeEnd, setCurrentlySelectingRangeEnd ] = React.useState<
  'start' | 'end'
  >('start');

  const validationError = useDateRangeValidation(props);

  const { pickerProps, inputProps, wrapperProps } = usePickerState(
    props,
    dateRangePickerValueManager,
  );

  const {
    value,
    onChange,
    PopperProps,
    PaperProps,
    TransitionComponent,
    components,
    componentsProps,
    ...other
  } = props;
  const DateInputProps = {
    ...inputProps,
    ...other,
    components,
    componentsProps,
    currentlySelectingRangeEnd,
    setCurrentlySelectingRangeEnd,
    validationError,
    ref,
  };

  return (
    <DesktopTooltipWrapper
      {...wrapperProps}
      DateInputProps={DateInputProps}
      KeyboardDateInputComponent={KeyboardDateInputComponent}
      PopperProps={PopperProps}
      PaperProps={PaperProps}
      TransitionComponent={TransitionComponent}
      components={components}
      componentsProps={componentsProps}
    >
      <DateRangePickerView<TInputDate, TDate>
        open={wrapperProps.open}
        DateInputProps={DateInputProps}
        currentlySelectingRangeEnd={currentlySelectingRangeEnd}
        setCurrentlySelectingRangeEnd={setCurrentlySelectingRangeEnd}
        {...pickerProps}
        components={components}
        componentsProps={componentsProps}
        {...other}
      />
    </DesktopTooltipWrapper>
  );
}) as DesktopDateRangePickerComponent;
