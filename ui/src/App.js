import React, { useEffect } from "react";
import "./App.css";
import "./components/ImagesSlider/ImagesSlider.css";
import "./components/HomePage/HomePage.css";
import { Route, useLocation } from "wouter";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import HomePage from "./components/HomePage/HomePage";
import StaticContext from "./context/StaticContext";
import Settings from "./components/Settings/Settings";
import UserEmprendimientos from "./components/Emprendimientos/UserEmprendimientos";
import UserProfile from "./components/UserProfile";
import Business from "./components/Business/Business";
import { PlacesProvider } from "./context/places/PlacesProvider";
import { MapProvider } from "./context/map/MapProvider";
import EmprendimientoDetail from "./components/Business";
import { isSessionExpired } from "./utils/utils";

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
    if (isSessionExpired()) {
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
