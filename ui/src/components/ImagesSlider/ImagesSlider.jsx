import { Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { Link } from "wouter";
import { typographyStyles } from "../../utils/stylesUtils";
import { HOME_PAGE_TYPE, theme } from "../../utils/utils";

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

const ImagesSlider = ({
  items,
  sectionTittle,
  type,
  selected,
  setSelected,
}) => {
  const typography = typographyStyles();

  const calculateClassname = (selectionId) => {
    if (selected) {
      const { isActive, id } = selected;
      return isActive && selectionId === id ? "content-active" : "content";
    }
    return "content";
  };

  const onSelection = (emprendimiento) => {
    if (selected.id !== emprendimiento.id) {
      setSelected({ isActive: true, id: emprendimiento.id, emprendimiento });
    } else {
      setSelected({
        ...selected,
        isActive: !selected.isActive,
      });
    }
  };

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
            {items?.map((emprendimiento) => (
              <div className='container' key={emprendimiento.id}>
                <div className={calculateClassname(emprendimiento.id)}>
                  <div onClick={() => onSelection(emprendimiento)}>
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
                          variant='outlined'
                          style={{ width: "75%" }}
                          to={`/emprendimiento/${emprendimiento.id}`}
                        >
                          Ver mas ...
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
  type: PropTypes.string,
  selected: PropTypes.shape({}),
  setSelected: PropTypes.func,
};

ImagesSlider.defaultProps = {
  sectionTittle: "",
  type: "",
  selected: null,
  setSelected: () => {},
};

export default ImagesSlider;
