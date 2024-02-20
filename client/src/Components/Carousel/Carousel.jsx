import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const items = [
  <div className="item" data-value="1">
    <img
      src="https://crepdogcrew.com/cdn/shop/files/IP_WEB_BANNERR_2000x.png?v=1703674573"
      alt=""
      className="w-full object-cover h-auto"
    />
  </div>,
  <div className="item" data-value="2">
    <img
      src="https://crepdogcrew.com/cdn/shop/files/powerpuff_X_nikegly_2000x.png?v=1702640757"
      alt=""
      className="w-full object-cover h-auto"
    />
  </div>,
  <div className="item" data-value="3">
    <img
      src="https://crepdogcrew.com/cdn/shop/files/deadbear_hoodies_2.0f_2000x.png?v=1704287783"
      alt=""
      className="w-full object-cover h-auto"
    />
  </div>,
  <div className="item" data-value="4">
    <img
      src="https://crepdogcrew.com/cdn/shop/files/esthrealln_2000x.png?v=1704287894"
      alt=""
      className="w-full object-cover h-auto"
    />
  </div>,
];

const Carousel = () => (
  <div className="max-w-full">
    <AliceCarousel
      autoPlay
      autoPlayStrategy="none"
      autoPlayInterval={1000}
      animationDuration={1000}
      animationType="fadeout"
      infinite
      touchTracking={false}
      disableDotsControls
      disableButtonsControls
      items={items}
    />
  </div>
);

export default Carousel;
