import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { generalStyles, typographyStyles } from "../../utils/stylesUtils";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import { Box, Grid } from "@mui/material";
import { Button } from "@mui/material";
import { addReview } from "../Emprendimientos/emprendimientosServices";

const Review = ({ emprendimientoId, userReview }) => {
  const typography = typographyStyles();
  const [review, setReview] = useState({ score: 0, comment: "" });
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isValidReview, setIsValidReview] = useState(false);
  const styles = generalStyles();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReview({
      ...review,
      [name]: value,
    });
  };

  useEffect(() => {
    if (userReview) {
      setReview(userReview);
    }
  }, [userReview]);

  useEffect(() => {
    setIsValidReview(review.score !== 0);
    if (review.id) {
      setIsReadOnly(true);
    } else {
      setIsReadOnly(false);
    }
  }, [review]);

  const handleSubmit = (e) => {
    addReview(emprendimientoId, review)
      .then((response) => {
        setIsReadOnly(true);
        setReview(response);
      })
      .catch((e) => {});
  };

  return (
    <>
      <Box p={5} sx={{ width: "50%" }}>
        <Box p={2} id='review'>
          <Typography className={typography.dark_title}>
            {isReadOnly ? "Gracias por tu reseña!" : "Dejanos tu reseña"}
          </Typography>
        </Box>
        <Stack
          direction='row'
          justifyContent='center'
          alignItems='center'
          spacing={2}
        >
          <Stack
            direction='column'
            justifyContent='center'
            alignItems='center'
            spacing={2}
          >
            <Avatar
              sx={{ bgcolor: "red", width: 56, height: 56 }}
              alt={"karen"}
              src='/broken-image.jpg'
            />
            <Rating
              name='score'
              value={review.score}
              precision={0.5}
              onChange={handleChange}
              disabled={isReadOnly}
            />
          </Stack>

          {isReadOnly ? (
            <Typography className={typography.light_regular_text}>
              {review.comment}
            </Typography>
          ) : (
            <TextField
              label='Dejanos tu reseña...'
              name='comment'
              value={review.comment}
              onChange={handleChange}
              disabled={isReadOnly}
              rows={4}
              multiline
              fullWidth
            />
          )}
        </Stack>
        {!isReadOnly && (
          <Grid container justifyContent='flex-end'>
            <Box pt={2}>
              <Button
                variant='contained'
                className={styles.form_button}
                onClick={handleSubmit}
                disabled={!isValidReview}
              >
                Enviar
              </Button>
            </Box>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Review;
