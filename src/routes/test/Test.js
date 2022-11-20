import React, { Fragment, useState } from 'react';
import Slider from './Slider';
import { SliderData } from './SliderData';

import Image1 from 'routes/test/priscilla-du-preez-CvGWhFilbow-unsplash.jpg';
import './test.styles.scss';

function Test() {
  const [current, setCurrent] = useState(0);

  const totalSlides = SliderData.length;

  if (!totalSlides) return null;

  const prevSlideClickHandler = () => {
    setCurrent(current === 0 ? totalSlides - 1 : current - 1);
  };
  const nextSlideClickHandler = () => {
    setCurrent(current === totalSlides - 1 ? 0 : current + 1);
  };

  return (
    <Fragment>
      <div className='test-container'>
        <span
          className='image-slider-arrow image-slider-left-arrow'
          onClick={prevSlideClickHandler}
        >
          &#10094;
        </span>
        <span
          className='image-slider-arrow image-slider-right-arrow'
          onClick={nextSlideClickHandler}
        >
          &#10095;
        </span>
        {/* {SliderData.map((data, index) => {
          // return (
          //   current === index && (
          //     <div
          //       className='test-image'
          //       style={{ backgroundImage: `url(${data.imageUrl})` }}
          //     />
          //   )
          // );
          return (
            <div
              className='test-image'
              style={{ backgroundImage: `url(${data.imageUrl})` }}
            />
          );
        })} */}
        <div>
          gp
          <div>
            parent
            <div>
              Child
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Test;
