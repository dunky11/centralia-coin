import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import * as serviceWorker from "./serviceWorker";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./theme";
import App from "./App";

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <link
      href="https://fonts.googleapis.com/css?family=Baloo+Bhaijaan|Roboto:300,400,500"
      rel="stylesheet"
    />
    <CssBaseline />
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();