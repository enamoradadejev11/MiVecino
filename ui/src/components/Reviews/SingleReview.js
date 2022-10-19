import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import { colors } from "../../utils/utils";
import { Box, Typography } from "@material-ui/core";
import { typographyStyles } from "../../utils/stylesUtils";
const { MINT, DARK_PINK } = colors;

const SingleReview = ({ review, isGood }) => {
  const typography = typographyStyles();
  const calculateAvatarColor = () => (isGood ? MINT : DARK_PINK);

  const { username, imagesUrl, score } = review;
  console.log("review", review);

  return (
    <>
      <Box p={2}>
        <Stack
          direction='row'
          justifyContent='flex-start'
          alignItems='flex-start'
          spacing={2}
        >
          <Avatar
            sx={{ bgcolor: calculateAvatarColor() }}
            alt={username}
            src='/broken-image.jpg'
          />
          <Stack
            direction='column'
            justifyContent='flex-start'
            alignItems='flex-start'
            textAlign='start'
          >
            <Typography className={typography.dark_regular_text}>
              {username}
            </Typography>
            <Rating
              name='half-rating'
              defaultValue={score}
              precision={0.5}
              readOnly
            />
            <Typography className={typography.light_regular_text}>
              {review.comment}
            </Typography>
            {imagesUrl?.map((url) => (
              <img
                key={url}
                src={url}
                alt='avatar'
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "contain",
                  paddingTop: 10,
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default SingleReview;
