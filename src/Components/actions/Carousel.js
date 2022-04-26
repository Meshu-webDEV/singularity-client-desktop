import React, { useMemo } from "react";
import Slider from "react-slick";

const Carousel = ({ images = [] }) => {
  const settings = useMemo(() => {
    return {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  });
  return (
    <Slider className="text-whites-light" {...settings}>
      {images.map((img, i) => (
        // <div className="py-4 backdrop-filter rounded-xl backdrop-blur-sm bg-dark-backgroundDarker bg-opacity-20">
        // </div>
        <img
          className="px-5 object-scale-down self-center flex-grow shadow-lg"
          src={img}
          key={i}
        />
      ))}
    </Slider>
  );
};

export default Carousel;
