import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography } from "@material-ui/core";
import { typographyStyles } from "../../utils/stylesUtils";
import PropTypes from "prop-types";
import { Link } from "wouter";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const ImagesSlider = ({ items, sectionTittle }) => {
  const typography = typographyStyles();
  return (
    <div className='slider'>
      {sectionTittle !== "" && (
        <div className='slider-section-tittle'>
          <Typography className={typography.large_section_title}>
            {sectionTittle}
          </Typography>
        </div>
      )}
      <Slider {...settings}>
        {items.map((emprendimiento) => (
          <div className='container' key={emprendimiento.id}>
            <div className='content'>
              <Link to={`/emprendimiento/${emprendimiento.id}`}>
                <div className='content-overlay' />
                <img
                  className='content-image'
                  alt={emprendimiento.name}
                  src={emprendimiento.imageUrl}
                />
                <div className='content-details fadeIn-bottom'>
                  <Typography className={typography.large_section_title_light}>
                    {emprendimiento.name}
                  </Typography>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

ImagesSlider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  sectionTittle: PropTypes.string,
};

ImagesSlider.defaultProps = {
  sectionTittle: "",
};

export default ImagesSlider;
