import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography } from "@material-ui/core";
import { typographyStyles } from "../../utils/stylesUtils";
import PropTypes from "prop-types";
import { Link } from "wouter";
import { HOME_PAGE_TYPE, theme } from "../../utils/utils";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

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

const ImagesSlider = ({ items, sectionTittle, type }) => {
  const typography = typographyStyles();
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className='slider'>
          {sectionTittle !== "" && (
            <div
              className={
                type === "userProfile"
                  ? "slider-section-center-tittle"
                  : "slider-section-tittle"
              }
            >
              <Typography className={typography.large_section_title}>
                {sectionTittle}
              </Typography>
            </div>
          )}
          <Slider {...settings}>
            {items.map((emprendimiento) => (
              <div className='container' key={emprendimiento.id}>
                <div className='content'>
                  <div
                    onClick={() => {
                      setIsActive(!isActive);
                    }}
                  >
                    <div className='content-overlay' />
                    <img
                      className='content-image'
                      alt={emprendimiento.name}
                      src={"/rosticeria.jpeg"}
                    />
                    <div className='content-details fadeIn-bottom'>
                      <Typography
                        className={typography.large_section_title_light}
                      >
                        {emprendimiento.name}
                      </Typography>
                      {type === HOME_PAGE_TYPE && (
                        <Button
                          component={Link}
                          variant='contained'
                          to={`/emprendimiento/${emprendimiento.id}`}
                        >
                          Ver
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </ThemeProvider>
    </>
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
