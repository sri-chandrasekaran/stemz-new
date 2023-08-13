import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Photo4 from '../assets/class_4.jpg'
import Photo5 from '../assets/class_5.jpg'
import Photo6 from '../assets/class_6.jpg'
import Photo7 from '../assets/class_7.jpg'
import './PhotoCarousel.css'


const images = [Photo4, Photo5, Photo6, Photo7]

const PhotoCarousel = () => {

    const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      autoplay: true,
      autoplaySpeed: 15000,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };

    return (
      <div className='photo-carousel'>
          <Slider {...settings}>
              {images.map((image, index) => (
              <div key={index} className="carousel-slide">
                <img src={image} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </Slider>
      </div>
    );
  };

  const NextArrow = ({ onClick }) => (
    <button className="carousel-arrow next" onClick={onClick}>
      →
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button className="carousel-arrow prev" onClick={onClick}>
      ←
    </button>
  );
  
  export default PhotoCarousel;