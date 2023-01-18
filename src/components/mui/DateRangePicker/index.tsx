import React from 'react';
import { useThemeProps } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import {
  DesktopDateRangePicker,
  DesktopDateRangePickerProps,
  DesktopDateRangePickerSlotsComponent,
  DesktopDateRangePickerSlotsComponentsProps,
} from './DesktopDateRangePicker';
import {
  MobileDateRangePicker,
  MobileDateRangePickerProps,
  MobileDateRangePickerSlotsComponent,
  MobileDateRangePickerSlotsComponentsProps,
} from './MobileDateRangePicker';

export interface DateRangePickerSlotsComponent
  extends MobileDateRangePickerSlotsComponent,
  DesktopDateRangePickerSlotsComponent {}

export interface DateRangePickerSlotsComponentsProps
  extends MobileDateRangePickerSlotsComponentsProps,
  DesktopDateRangePickerSlotsComponentsProps {}

export interface DateRangePickerProps<TInputDate, TDate>
  extends Omit<DesktopDateRangePickerProps<TInputDate, TDate>, 'components' | 'componentsProps'>,
  Omit<MobileDateRangePickerProps<TInputDate, TDate>, 'components' | 'componentsProps'> {
  /**
   * CSS media query when `Mobile` mode will be changed to `Desktop`.
   * @default '@media (pointer: fine)'
   * @example '@media (min-width: 720px)' or theme.breakpoints.up("sm")
   */
  desktopModeMediaQuery?: string;
  /**
   * Overrideable components.
   * @default {}
   */
  components?: Partial<DateRangePickerSlotsComponent>;
  /**
   * The props used for each component slot.
   * @default {}
   */
  componentsProps?: Partial<DateRangePickerSlotsComponentsProps>;
}

type DateRangePickerComponent = (<TInputDate, TDate = TInputDate>(
  props: DateRangePickerProps<TInputDate, TDate> & React.RefAttributes<HTMLDivElement>,
) => JSX.Element) & { propTypes?: any };

export const DateRangePicker = React.forwardRef(function DateRangePicker<
  TInputDate,
  TDate = TInputDate,
>(inProps: DateRangePickerProps<TInputDate, TDate>, ref: React.Ref<HTMLDivElement>) {
  const props = useThemeProps({ props: inProps, name: 'MuiDateRangePicker' });

  const {
    desktopModeMediaQuery = '@media (pointer: fine)',
    DialogProps,
    PopperProps,
    PaperProps,
    TransitionComponent,
    ...other
  } = props;

  const isDesktop = useMediaQuery(desktopModeMediaQuery, { defaultMatches: true });

  if (isDesktop) {
    return (
      <DesktopDateRangePicker
        ref={ref}
        PopperProps={PopperProps}
        PaperProps={PaperProps}
        TransitionComponent={TransitionComponent}
        {...other}
      />
    );
  }

  return <MobileDateRangePicker ref={ref} DialogProps={DialogProps} {...other} />;
}) as DateRangePickerComponent;
