import React, { useContext, useState } from "react";
import PlacesContext from "../../context/places/PlacesContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImagesSlider from "../ImagesSlider/ImagesSlider";
import MainMap from "../Map/MainMap";
import BtnMyLocation from "../Map/BtnMyLocation";
import Footer from "../Common/Footer/Footer";
import SearchBar from "../SearchBar/SearchBar";
import { getUserWithExpiry, HOME_PAGE_TYPE } from "../../utils/utils";
import { useLocation } from "wouter";

const recomendations = [
  {
    tittle: "Algo cerca de ti...",
    items: [
      {
        id: 16,
        name: "Banderillas Coreanas",
        imageUrl: "/rosticeria.jpeg",
        latitude: 20.64146512389774,
        longitude: -103.39109344032457,
      },
      {
        id: 17,
        name: "Papeleria",
        imageUrl: "/rosticeria.jpeg",
        latitude: 20.64146512389774,
        longitude: -103.39109344032457,
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

const HomePage = () => {
  const { userLocation } = useContext(PlacesContext);
  const [, setLocation] = useLocation();
  const [selected, setSelected] = useState({ isActive: false, id: "" });

  if (!getUserWithExpiry()) {
    setLocation("/login");
  }

  if (!navigator.geolocation) {
    alert("error tu navegador no tiene geolocation");
  }

  return (
    <>
      <SearchBar />
      <div className='home-page-map-section'>
        <MainMap />
        <BtnMyLocation location={userLocation} />
      </div>
      <div className='home-page-recomendation-section'>
        {recomendations.map((recomendation) => (
          <div className='slider-section' key={recomendation.tittle}>
            <ImagesSlider
              items={recomendation.items}
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
