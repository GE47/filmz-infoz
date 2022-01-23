import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import "@fontsource/poppins";
import { BrowserRouter } from "react-router-dom";
import "focus-visible/dist/focus-visible";
import "./il8next";

import App from "./App";
import theme from "./theme/index";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
