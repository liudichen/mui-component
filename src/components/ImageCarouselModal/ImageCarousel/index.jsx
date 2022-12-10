import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export const ImageCarousel = (props) => {
  const { images, children, ...restProps } = props;
  if (!children && !(Array.isArray(images) && images?.length)) {
    return <></>;
  }
  return (
    <Carousel
      {...restProps}
    >
      { children || images.map((item, index) => (
        <div key={index}>
          <img src={item?.src ?? item?.url} />
          <p className='legend'>{item?.title ?? item?.name ?? ''}</p>
        </div>
      ))}
    </Carousel>
  );
};

ImageCarousel.displayName = 'iimm.Mui.ImageCarousel';

ImageCarousel.defaultProps = {};
