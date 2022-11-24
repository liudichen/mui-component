import React from 'react';
import {
  MobileWrapper,
  MobileWrapperProps,
  usePickerState,
  DateInputPropsLike,
  MobileWrapperSlotsComponent,
  MobileWrapperSlotsComponentsProps,
  DateInputSlotsComponent,
} from '@mui/x-date-pickers/internals';

import { useDateRangeValidation } from './useDateRangeValidation';
import {
  DateRangePickerView,
  DateRangePickerViewSlotsComponent,
  DateRangePickerViewSlotsComponentsProps,
} from './DateRangePickerView';
import { DateRangePickerInput } from './DateRangePickerInput';
import {
  BaseDateRangePickerProps,
  useDateRangePickerDefaultizedProps,
  dateRangePickerValueManager,
} from './shared';


const PureDateInputComponent = DateRangePickerInput as unknown as React.FC<DateInputPropsLike>;

export interface MobileDateRangePickerSlotsComponent
  extends MobileWrapperSlotsComponent,
  DateRangePickerViewSlotsComponent,
  DateInputSlotsComponent {}

export interface MobileDateRangePickerSlotsComponentsProps
  extends MobileWrapperSlotsComponentsProps,
  DateRangePickerViewSlotsComponentsProps {}

export interface MobileDateRangePickerProps<TInputDate, TDate>
  extends BaseDateRangePickerProps<TInputDate, TDate>,
  MobileWrapperProps {
  /**
   * Overrideable components.
   * @default {}
   */
  components?: Partial<MobileDateRangePickerSlotsComponent>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps?: Partial<MobileDateRangePickerSlotsComponentsProps>;
}

type MobileDateRangePickerComponent = (<TInputDate, TDate = TInputDate>(
  props: MobileDateRangePickerProps<TInputDate, TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

/**
 *
 * Demos:
 *
 * - [Date Range Picker](https://mui.com/x/react-date-pickers/date-range-picker/)
 *
 * API:
 *
 * - [MobileDateRangePicker API](https://mui.com/x/api/date-pickers/mobile-date-range-picker/)
 */
export const MobileDateRangePicker = React.forwardRef(function MobileDateRangePicker<
  TInputDate,
  TDate = TInputDate,
>(inProps: MobileDateRangePickerProps<TInputDate, TDate>, ref: React.Ref<HTMLDivElement>) {

  const props = useDateRangePickerDefaultizedProps<
  TInputDate,
  TDate,
  MobileDateRangePickerProps<TInputDate, TDate>
  >(inProps, 'MuiMobileDateRangePicker');

  const { value, onChange, components, componentsProps, ...other } = props;

  const [ currentlySelectingRangeEnd, setCurrentlySelectingRangeEnd ] = React.useState<
  'start' | 'end'
  >('start');

  const pickerStateProps = {
    ...other,
    value,
    onChange,
  };

  const { pickerProps, inputProps, wrapperProps } = usePickerState(
    pickerStateProps,
    dateRangePickerValueManager,
  );

  const validationError = useDateRangeValidation(props);

  const DateInputProps = {
    ...inputProps,
    ...other,
    components,
    componentsProps,
    currentlySelectingRangeEnd,
    setCurrentlySelectingRangeEnd,
    validationError,
    ref,
    mobile: true,
  };

  return (
    <MobileWrapper
      {...other}
      {...wrapperProps}
      DateInputProps={DateInputProps}
      PureDateInputComponent={PureDateInputComponent}
      components={components}
      componentsProps={componentsProps}
    >
      <DateRangePickerView
        open={wrapperProps.open}
        DateInputProps={DateInputProps}
        currentlySelectingRangeEnd={currentlySelectingRangeEnd}
        setCurrentlySelectingRangeEnd={setCurrentlySelectingRangeEnd}
        {...pickerProps}
        components={components}
        componentsProps={componentsProps}
        {...other}
      />
    </MobileWrapper>
  );
}) as MobileDateRangePickerComponent;
