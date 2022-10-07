import React from "react";
import "./App.css";
import { Route } from "wouter";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import HomePage from "./components/HomePage/HomePage";
import StaticContext from "./context/StaticContext";
import Settings from "./components/Settings/Settings";
import UserEmprendimientos from "./components/Emprendimientos/UserEmprendimientos";
import UserProfile from "./components/UserProfile";
import ReviewSection from "./components/Reviews";
import Business from "./components/Business/Business";

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

  return (
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
              <Route path='/emprendimientos' component={UserEmprendimientos} />
              <Route path='/perfil' component={UserProfile} />
              <Route path='/emprendimiento/:id' component={ReviewSection} />
              <Route path='/business' component={Business} />
              <div></div>
            </div>
          </ThemeProvider>
        </div>
      </section>
    </StaticContext.Provider>
  );
}

export default App;
