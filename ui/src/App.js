import React from "react";
import "./App.css";
import { Route } from "wouter";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

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
            <Route path='/registro' component={Register} />
            <Route path='/' component={Login} />
            <div></div>
          </div>
        </ThemeProvider>
      </div>
    </section>
  );
}

export default App;
