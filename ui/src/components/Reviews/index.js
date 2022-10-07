import React, { useEffect, useState } from "react";
import EmprendimientoReviews from "./EmprendimientoReviews";
import Review from "./Review";
import { Grid } from "@mui/material";
import {
  getEmprendimiento,
  getReviewEmprendimientos,
} from "../Emprendimientos/emprendimientosServices";
import { useLocation } from "wouter";
import { getUser } from "../../utils/utils";
import Business from "../Business/Business";
import { Footer } from "../Common/Footer/Footer";

const ReviewSection = ({ params }) => {
  const { id } = params;
  const [emprendimiento, setEmprendimiento] = useState();
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
    getEmprendimiento(id)
      .then((response) => setEmprendimiento(response))
      .catch((e) => setErrorMessage(e.message));
  }, [id, setReviews, setErrorMessage]);

  useEffect(() => {
    if (reviews) {
      const user = getUser();
      setUserReview(
        reviews.find((review) => review.username === user.username)
      );
    }
  }, [reviews]);

  return (
    <>
      <Business data={emprendimiento} />
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
      <Footer />
    </>
  );
};

export default ReviewSection;
