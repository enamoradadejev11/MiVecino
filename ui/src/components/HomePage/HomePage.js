import React, { useContext, useEffect } from "react";
import { useLocation } from "wouter";
import PlacesContext from "../../context/places/PlacesContext";
import BtnMyLocation from "../Map/BtnMyLocation";
import MainMap from "../Map/MainMap";

const HomePage = () => {
  const [, setLocation] = useLocation();
  const { userLocation } = useContext(PlacesContext);

  if (!navigator.geolocation) {
    alert("error tu navegador no tiene geolocation");
  }

  useEffect(() => {
    if (!window.localStorage.getItem("user")) {
      setLocation("/login");
    }
  }, [setLocation]);

  return (
    <>
      <MainMap />
      <BtnMyLocation location={userLocation} />
    </>
  );
};

export default HomePage;
