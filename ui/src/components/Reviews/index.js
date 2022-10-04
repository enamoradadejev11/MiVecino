import React, { useEffect, useState } from "react";
import EmprendimientoReviews from "./EmprendimientoReviews";
import Review from "./Review";
import { Grid } from "@mui/material";
import { getReviewEmprendimientos } from "../Emprendimientos/emprendimientosServices";
import { useLocation } from "wouter";
import { getUser } from "../../utils/utils";

const ReviewSection = ({ params }) => {
  const { id } = params;
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState({ score: 0, comment: "" });
  const [, setErrorMessage] = useState("");
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!window.localStorage.getItem("user")) {
      setLocation("/login");
    }
  }, [setLocation]);

  useEffect(() => {
    getReviewEmprendimientos(id)
      .then((response) => {
        setReviews(response);
      })
      .catch((e) => {
        setErrorMessage(e.message);
      });
  }, [id, setReviews, setErrorMessage]);

  useEffect(() => {
    if (reviews) {
      const user = getUser();
      console.log("user", user);
      setUserReview(
        reviews.find((review) => review.username === user.username)
      );
    }
  }, [reviews]);

  console.log("reviews", reviews);

  return (
    <>
      <Grid
        container
        spacing={0}
        direction='column'
        alignItems='center'
        justifyContent='center'
        style={{ minHeight: "100vh" }}
      >
        <EmprendimientoReviews reviews={reviews} />
        <Review emprendimientoId={id} userReview={userReview} />
      </Grid>
    </>
  );
};

export default ReviewSection;
