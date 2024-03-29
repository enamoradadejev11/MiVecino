import React, { useContext, useEffect, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { useLocation } from "wouter";
import MapContext from "../../context/map/MapContext";
import PlacesContext from "../../context/places/PlacesContext";
import { getRecommendations } from "../../services/recommendationApi";
import {
  getUserWithExpiry,
  headerAccess,
  HOME_PAGE_TYPE,
} from "../../utils/utils";
import Footer from "../Common/Footer/Footer";
import Navbar from "../Common/Navbar/Navbar";
import ImagesSlider from "../ImagesSlider/ImagesSlider";
import BtnMyLocation from "../Map/BtnMyLocation";
import MainMap from "../Map/MainMap";
import SearchBar from "../SearchBar/SearchBar";

/*
const recomendations = [
  {
    tittle: "Algo cerca de ti...",
    items: [
      {
        id: 16,
        name: "Banderillas Coreanas",
        imageUrl: "/rosticeria.jpeg",
        latitude: "20.64146512389774",
        longitude: "-103.39109344032457",
      },
      {
        id: 17,
        name: "Papeleria",
        imageUrl: "/rosticeria.jpeg",
        latitude: 20.6473465261303,
        longitude: -103.3903892274224,
      },
      {
        id: 18,
        name: "Carpinteria",
        imageUrl: "/rosticeria.jpeg",
        latitude: 20.64146512389774,
        longitude: -103.39109344032457,
      },
      {
        id: 19,
        name: "Plomeria Roman",
        imageUrl: "/rosticeria.jpeg",
        latitude: 20.64146512389774,
        longitude: -103.39109344032457,
      },
      {
        id: 20,
        name: "Taquitos sureños",
        imageUrl: "/rosticeria.jpeg",
        latitude: 20.64146512389774,
        longitude: -103.39109344032457,
      },
      {
        id: 21,
        name: "Cocina: Sabor a mama",
        imageUrl: "/rosticeria.jpeg",
        latitude: 20.64146512389774,
        longitude: -103.39109344032457,
      },
      {
        id: 22,
        name: "Cafe Le Amour",
        imageUrl: "/rosticeria.jpeg",
        latitude: 20.64146512389774,
        longitude: -103.39109344032457,
      },
    ],
  },
  {
    tittle: "Lo mas popular",
    items: [
      { id: 23, name: "Banderillas Coreanas", imageUrl: "/rosticeria.jpeg" },
      { id: 24, name: "Papeleria", imageUrl: "/rosticeria.jpeg" },
      { id: 25, name: "Carpinteria", imageUrl: "/rosticeria.jpeg" },
      { id: 26, name: "Plomeria Roman", imageUrl: "/rosticeria.jpeg" },
      { id: 27, name: "Taquitos sureños", imageUrl: "/rosticeria.jpeg" },
      { id: 28, name: "Cocina: Sabor a mama", imageUrl: "/rosticeria.jpeg" },
      { id: 29, name: "Cafe Le Amour", imageUrl: "/rosticeria.jpeg" },
    ],
  },
  {
    tittle: "Mas recientes",
    items: [
      { id: 30, name: "Banderillas Coreanas", imageUrl: "/rosticeria.jpeg" },
      { id: 31, name: "Papeleria", imageUrl: "/rosticeria.jpeg" },
      { id: 32, name: "Carpinteria", imageUrl: "/rosticeria.jpeg" },
      { id: 33, name: "Plomeria Roman", imageUrl: "/rosticeria.jpeg" },
      { id: 34, name: "Taquitos sureños", imageUrl: "/rosticeria.jpeg" },
      { id: 35, name: "Cocina: Sabor a mama", imageUrl: "/rosticeria.jpeg" },
      { id: 36, name: "Cafe Le Amour", imageUrl: "/rosticeria.jpeg" },
    ],
  },
  {
    tittle: "Algo que te podria gustar",
    items: [
      { id: 37, name: "Banderillas Coreanas", imageUrl: "/rosticeria.jpeg" },
      { id: 38, name: "Papeleria", imageUrl: "/rosticeria.jpeg" },
      { id: 39, name: "Carpinteria", imageUrl: "/rosticeria.jpeg" },
      { id: 40, name: "Plomeria Roman", imageUrl: "/rosticeria.jpeg" },
      { id: 41, name: "Taquitos sureños", imageUrl: "/rosticeria.jpeg" },
      { id: 42, name: "Cocina: Sabor a mama", imageUrl: "/rosticeria.jpeg" },
      { id: 43, name: "Cafe Le Amour", imageUrl: "/rosticeria.jpeg" },
    ],
  },
];
*/

const HomePage = () => {
  const { userLocation, showPlaceSelected } = useContext(PlacesContext);
  const { getRouteBetweenPoints, cleanMap } = useContext(MapContext);
  const [, setLocation] = useLocation();
  const [recommendations, setRecommendations] = useState([]);
  const [selected, setSelected] = useState({ isActive: false, id: "" });

  useEffect(() => {
    getRecommendations().then((resp) => {
      setRecommendations(
        resp.filter((recommendation) => recommendation.Items.length)
      );
    });
  }, []);

  useEffect(() => {
    if (selected.isActive) {
      const { emprendimiento } = selected;
      showPlaceSelected(emprendimiento);
      getRouteBetweenPoints(userLocation, [
        emprendimiento.longitude,
        emprendimiento.latitude,
      ]);
    } else {
      cleanMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  if (!getUserWithExpiry()) {
    setLocation("/login");
  }

  if (!navigator.geolocation) {
    alert("error tu navegador no tiene geolocation");
  }

  return (
    <>
      <Navbar types={[headerAccess.SETTINGS]} />
      <SearchBar />
      <div className='home-page-map-section'>
        <MainMap isHomepage />
        <BtnMyLocation location={userLocation} />
      </div>
      <div className='home-page-recomendation-section'>
        {recommendations.map((recomendation) => (
          <div className='slider-section' key={recomendation.tittle}>
            <ImagesSlider
              items={recomendation.Items}
              sectionTittle={recomendation.tittle}
              type={HOME_PAGE_TYPE}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
