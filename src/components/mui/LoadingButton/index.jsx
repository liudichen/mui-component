// from @mui/lab@5.0.0-alpha.108 https://github.com/mui/material-ui/tree/master/packages/mui-lab
import React from 'react';
import { capitalize } from '@mui/material/utils';
import { styled, useThemeProps } from '@mui/material/styles';
import { Button, CircularProgress } from '@mui/material';
import { useId } from '@iimm/react-shared';

import { composeClasses } from '../mui-utils';
import loadingButtonClasses, { getLoadingButtonUtilityClass } from './loadingButtonClasses';

const useUtilityClasses = (ownerState) => {
  const { loading, loadingPosition, classes } = ownerState;

  const slots = {
    root: [ 'root', loading && 'loading' ],
    startIcon: [ loading && `startIconLoading${capitalize(loadingPosition)}` ],
    endIcon: [ loading && `endIconLoading${capitalize(loadingPosition)}` ],
    loadingIndicator: [
      'loadingIndicator',
      loading && `loadingIndicator${capitalize(loadingPosition)}`,
    ],
  };

  const composedClasses = composeClasses(slots, getLoadingButtonUtilityClass, classes);

  return {
    ...classes, // forward the outlined, color, etc. classes to Button
    ...composedClasses,
  };
};

// TODO use `import { rootShouldForwardProp } from '../styles/styled';` once move to core
const rootShouldForwardProp = (prop) =>
  prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as' && prop !== 'classes';
const LoadingButtonRoot = styled(Button, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiLoadingButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [
      styles.root,
      styles.startIconLoadingStart && {
        [`& .${loadingButtonClasses.startIconLoadingStart}`]: styles.startIconLoadingStart,
      },
      styles.endIconLoadingEnd && {
        [`& .${loadingButtonClasses.endIconLoadingEnd}`]: styles.endIconLoadingEnd,
      },
    ];
  },
})(({ ownerState, theme }) => ({
  [`& .${loadingButtonClasses.startIconLoadingStart}, & .${loadingButtonClasses.endIconLoadingEnd}`]:
  {
    transition: theme.transitions.create([ 'opacity' ], {
      duration: theme.transitions.duration.short,
    }),
    opacity: 0,
  },
  ...(ownerState.loadingPosition === 'center' && {
    transition: theme.transitions.create([ 'background-color', 'box-shadow', 'border-color' ], {
      duration: theme.transitions.duration.short,
    }),
    [`&.${loadingButtonClasses.loading}`]: {
      color: 'transparent',
    },
  }),
  ...(ownerState.loadingPosition === 'start' &&
    ownerState.fullWidth && {
    [`& .${loadingButtonClasses.startIconLoadingStart}, & .${loadingButtonClasses.endIconLoadingEnd}`]:
    {
      transition: theme.transitions.create([ 'opacity' ], {
        duration: theme.transitions.duration.short,
      }),
      opacity: 0,
      marginRight: -8,
    },
  }),
  ...(ownerState.loadingPosition === 'end' &&
    ownerState.fullWidth && {
    [`& .${loadingButtonClasses.startIconLoadingStart}, & .${loadingButtonClasses.endIconLoadingEnd}`]:
    {
      transition: theme.transitions.create([ 'opacity' ], {
        duration: theme.transitions.duration.short,
      }),
      opacity: 0,
      marginLeft: -8,
    },
  }),
}));

const LoadingButtonLoadingIndicator = styled('div', {
  name: 'MuiLoadingButton',
  slot: 'LoadingIndicator',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [
      styles.loadingIndicator,
      styles[`loadingIndicator${capitalize(ownerState.loadingPosition)}`],
    ];
  },
})(({ theme, ownerState }) => ({
  position: 'absolute',
  visibility: 'visible',
  display: 'flex',
  ...(ownerState.loadingPosition === 'start' &&
    (ownerState.variant === 'outlined' || ownerState.variant === 'contained') && {
    left: ownerState.size === 'small' ? 10 : 14,
  }),
  ...(ownerState.loadingPosition === 'start' &&
    ownerState.variant === 'text' && {
    left: 6,
  }),
  ...(ownerState.loadingPosition === 'center' && {
    left: '50%',
    transform: 'translate(-50%)',
    // @ts-ignore
    color: (theme.vars || theme).palette.action.disabled,
  }),
  ...(ownerState.loadingPosition === 'end' &&
    (ownerState.variant === 'outlined' || ownerState.variant === 'contained') && {
    right: ownerState.size === 'small' ? 10 : 14,
  }),
  ...(ownerState.loadingPosition === 'end' &&
    ownerState.variant === 'text' && {
    right: 6,
  }),
  ...(ownerState.loadingPosition === 'start' &&
    ownerState.fullWidth && {
    position: 'relative',
    left: -10,
  }),
  ...(ownerState.loadingPosition === 'end' &&
    ownerState.fullWidth && {
    position: 'relative',
    right: -10,
  }),
}));

export const LoadingButton = React.forwardRef(function LoadingButton(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiLoadingButton' });
  const {
    children, disabled = false, id: idProp, loading = false, loadingIndicator: loadingIndicatorProp, loadingPosition = 'center', variant = 'text',
    ...other
  } = props;

  const id = useId(idProp);
  const loadingIndicator = loadingIndicatorProp ?? (
    <CircularProgress aria-labelledby={id} color="inherit" size={16} />
  );

  const ownerState = {
    ...props,
    disabled,
    loading,
    loadingIndicator,
    loadingPosition,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  const loadingButtonLoadingIndicator = loading ? (
    <LoadingButtonLoadingIndicator className={classes.loadingIndicator} ownerState={ownerState}>
      {loadingIndicator}
    </LoadingButtonLoadingIndicator>
  ) : null;

  return (
    <LoadingButtonRoot
      disabled={disabled || loading}
      id={id}
      // @ts-ignore
      ref={ref}
      {...other}
      variant={variant}
      classes={classes}
      ownerState={ownerState}
    >
      {ownerState.loadingPosition === 'end' ? children : loadingButtonLoadingIndicator}
      {ownerState.loadingPosition === 'end' ? loadingButtonLoadingIndicator : children}
    </LoadingButtonRoot>
  );
});

LoadingButton.displayName = 'iimm.Mui.LoadingButton';
