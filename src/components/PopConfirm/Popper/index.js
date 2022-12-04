import { Popper as MuiPopper, styled } from '@mui/material';

export const Popper = styled(MuiPopper, {
  shouldForwardProp: (prop) => prop !== 'arrow',
})(({ theme, arrow }) => ({
  zIndex: theme.zIndex.drawer,
  '& > div': {
    position: 'relative',
  },
  '&[data-popper-placement*="bottom"]': {
    '& > div': {
      marginTop: arrow ? 2 : 0,
    },
    '& .MuiPopper-arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.background.paper} transparent`,
        filter: 'drop-shadow(1px -1px 0px #00000080)',
      },
    },
  },
  '&[data-popper-placement*="top"]': {
    '& > div': {
      marginBottom: arrow ? 2 : 0,
    },
    '& .MuiPopper-arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${theme.palette.background.paper} transparent transparent transparent`,
        filter: 'drop-shadow(1px 2px 1px rgba(0,0,0,0.2))',
      },
    },
  },
  '&[data-popper-placement*="right"]': {
    '& > div': {
      marginLeft: arrow ? 2 : 0,
    },
    '& .MuiPopper-arrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
        filter: 'drop-shadow(-1px 1px 1px #00000080)',
      },
    },
  },
  '&[data-popper-placement*="left"]': {
    '& > div': {
      marginRight: arrow ? 2 : 0,
    },
    '& .MuiPopper-arrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${theme.palette.background.paper}`,
        filter: 'drop-shadow(1px 1px 1px #00000080)',
      },
    },
  },
}));
