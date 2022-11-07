import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { Route, useLocation } from "wouter";
import "./App.css";
import "./components/Addresses/AddressSearchBar/addressSearchBar.css";
import Addresses from "./components/Addresses/Adresses";
import EmprendimientoDetail from "./components/Business";
import Business from "./components/Business/Business";
import "./components/Emprendimientos/selector.css";
import UserEmprendimientos from "./components/Emprendimientos/UserEmprendimientos";
import HomePage from "./components/HomePage/HomePage";
import "./components/HomePage/HomePage.css";
import "./components/ImagesSlider/ImagesSlider.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import "./components/SearchBar/SearchBar.css";
import Settings from "./components/Settings/Settings";
import UserProfile from "./components/UserProfile";
import { MapProvider } from "./context/map/MapProvider";
import { PlacesProvider } from "./context/places/PlacesProvider";
import StaticContext from "./context/StaticContext";
import { getUserWithExpiry } from "./utils/utils";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FFFFFF",
      },
    },
    typography: {
      fontFamily: "Karla",
    },
  });

  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!getUserWithExpiry()) {
      setLocation("/login");
    }
  }, [setLocation]);

  return (
    <PlacesProvider>
      <MapProvider>
        <StaticContext.Provider
          value={{
            user: window.localStorage.getItem("user"),
          }}
        >
          <section>
            <div className='App'>
              <ThemeProvider theme={theme}>
                <div className='App'>
                  <Route path='/registro' component={Register} />
                  <Route path='/login' component={Login} />
                  <Route path='/' component={HomePage} />
                  <Route path='/settings' component={Settings} />
                  <Route
                    path='/emprendimientos'
                    component={UserEmprendimientos}
                  />
                  <Route path='/perfil' component={UserProfile} />
                  <Route
                    path='/emprendimiento/:id'
                    component={EmprendimientoDetail}
                  />
                  <Route path='/business' component={Business} />
                  <Route path='/direcciones' component={Addresses} />
                  <div></div>
                </div>
              </ThemeProvider>
            </div>
          </section>
        </StaticContext.Provider>
      </MapProvider>
    </PlacesProvider>
  );
}

export default App;
