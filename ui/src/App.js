import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useLocation } from "wouter";
import "./App.css";
import "./components/Addresses/AddressSearchBar/addressSearchBar.css";
import "./components/Emprendimientos/selector.css";
import "./components/HomePage/HomePage.css";
import "./components/ImagesSlider/ImagesSlider.css";
import "./components/SearchBar/SearchBar.css";
import { MapProvider } from "./context/map/MapProvider";
import { PlacesProvider } from "./context/places/PlacesProvider";
import StaticContext from "./context/StaticContext";
import AdminRoutes from "./utils/AdminRoutes";
import UserRoutes from "./utils/UserRoutes";
import { getUserWithExpiry, hasAdminRole } from "./utils/utils";

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
    if (!getUserWithExpiry() && !window.location.href.includes("registro")) {
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
                  {hasAdminRole() ? <AdminRoutes /> : <UserRoutes />}
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
