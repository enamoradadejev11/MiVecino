import React from "react";
import "./App.css";
import { Route } from "wouter";
import SignInSide from "./components/Login/SignInSide";
import SignUp from "./components/Login/SignUpSide";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

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
    <section>
      <div className='App'>
        <ThemeProvider theme={theme}>
          <div className='App'>
            <Route path='/signup' component={SignUp} />
            <Route path='/' component={SignInSide} />
            <div></div>
          </div>
        </ThemeProvider>
      </div>
    </section>
  );
}

export default App;
