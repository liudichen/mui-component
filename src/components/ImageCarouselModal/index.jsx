/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-28 14:38:49
 * @LastEditTime: 2022-06-13 11:11:02
 */
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Link } from '@mui/material';
import { isMobile } from 'react-device-detect';

import { useMergedState } from '../../../common';
import ImageCarousel from './ImageCarousel';
import carousel from './ImageCarousel/propTypes';

const ImageCarouselModal = (props) => {
  const {
    trigger, triggerSx, triggerProps,
    open: openProp, onClose, title,
    children, images,
    fullWidth, fullScreen, maxWidth,
    PaperProps, DialogProps,
    ...restProps
  } = props;
  const [ open, setOpen ] = useMergedState(false, { value: openProp, onChange: onClose, postState: (s) => !!s });
  return (
    <>
      <Link
        {...{
          underline: 'none',
          ...(triggerProps || {}),
          sx: {
            cursor: 'pointer',
            ...(triggerSx || {}),
          },
        }}
      >
        { trigger }
      </Link>
      <Dialog
        {...{
          PaperProps,
          fullWidth,
          maxWidth,
          fullScreen,
          ...(DialogProps || {}),
          open,
          onClose: () => setOpen(false),
        }}
      >
        <DialogTitle variant='h4' component='div'>
          { title }
        </DialogTitle>
        <DialogContent>
          <ImageCarousel images={images} {...restProps}>
            { children }
          </ImageCarousel>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={() => setOpen(false)}>
            关闭
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
ImageCarouselModal.defaultProps = {
  fullWidth: true,
  maxWidth: 'md',
  title: '图片预览',
  fullScreen: isMobile,
};

ImageCarouselModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  trigger: PropTypes.node,
  triggerSx: PropTypes.object,
  triggerProps: PropTypes.shape({
    align: PropTypes.oneOf([ 'inherit', 'center', 'justify', 'left', 'right' ]),
    classes: PropTypes.object,
    color: PropTypes.any, // 'primary
    component: PropTypes.elementType,
    gutterBottom: PropTypes.bool,
    noWrap: PropTypes.bool,
    paragraph: PropTypes.bool,
    TypographyClasses: PropTypes.object,
    underline: PropTypes.oneOf([ 'none', 'always', 'hover' ]),
    variant: PropTypes.oneOfType([ PropTypes.oneOf([ 'inherit', 'body1', 'body2', 'button', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'overline', 'subtitle1', 'subtitle2' ]), PropTypes.string ]),
    variantMapping: PropTypes.object, // { h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6', subtitle1: 'h6', subtitle2: 'h6', body1: 'p', body2: 'p', inherit: 'p', }
  }),
  fullWidth: PropTypes.bool,
  fullScreen: PropTypes.bool,
  maxWidth: PropTypes.oneOfType([
    PropTypes.oneOf([ 'sm', 'xs', 'md', 'lg', 'xl', false ]),
    PropTypes.string,
  ]),
  DialogProps: PropTypes.object,
  PaperProps: PropTypes.object,
  title: PropTypes.node,

  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
    name: PropTypes.string,
  })),

  ...carousel,
};

export {
  ImageCarousel,
};

export default ImageCarouselModal;
