import React from "react";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import { Box, Typography } from "@material-ui/core";
import SingleReview from "./SingleReview";
import Divider from "@mui/material/Divider";
import { typographyStyles } from "../../utils/stylesUtils";
import PropTypes from "prop-types";

/* const reviews = {
  good: [
    {
      id: 1,
      username: "Pulpo",
      score: 5,
      comment: "Muy rico y el lugar super bonito.",
      imagesUrl: [
        "https://www.eluniversal.com.mx/sites/default/files/2021/04/29/elotes_en_mercado_jamaica.jpeg",
        "https://fastly.4sqi.net/img/general/600x600/442099950_cNBL7axgkajTEu5qRQ8LnsKmTm_ha3AN8G-3vV_KfsU.jpg",
      ],
    },
    {
      id: 2,
      username: "Bellota",
      score: 3,
      comment: "El flaming hot esta decente, pero habia ratasss!",
      imagesUrl: [],
    },
  ],
  bad: [
    {
      id: 3,
      username: "Bellota",
      score: 1.5,
      comment: "El flaming hot esta decente, pero habia ratasss!",
      imagesUrl: [
        "https://3.bp.blogspot.com/-0tpboumNpZk/WOq3CCNNg9I/AAAAAAAAlrs/TDEWe8aMrHQ7q1qBZQC3bpmXIi0EKgYbACLcB/s1600/thevoxkitchenelote.JPG",
      ],
    },
    {
      id: 4,
      username: "Camaron Tostado",
      score: 2,
      comment: "Muy mal servicio, algo caro para la calidad.",
      imagesUrl: [
        "https://i0.wp.com/thehappening.com/wp-content/uploads/2017/05/elotes-toppings.jpg?resize=1024%2C694&ssl=1",
      ],
    },
  ],
}; */

const EmprendimientoReviews = ({ reviews }) => {
  const typography = typographyStyles();

  return (
    <>
      <Box p={5}>
        <Typography className={typography.dark_title}>
          Nuestras reseñas
        </Typography>
        <Stack direction='column'>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              {reviews?.good?.map((review) => (
                <SingleReview key={review.id} review={review} isGood />
              ))}
            </Grid>
            <Grid item xs={2}>
              <Divider orientation='vertical' flexItem />
            </Grid>
            <Grid item xs={12} md={5}>
              {reviews?.bad?.map((review) => (
                <SingleReview key={review.id} review={review} />
              ))}
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </>
  );
};

EmprendimientoReviews.propTypes = {
  reviews: PropTypes.shape({}),
};

EmprendimientoReviews.defaultProps = { reviews: { good: [], bad: [] } };

export default EmprendimientoReviews;
