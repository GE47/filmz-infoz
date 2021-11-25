import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import "@brainhubeu/react-carousel/lib/style.css";
import "@fontsource/poppins";
import "focus-visible/dist/focus-visible";

import App from "./App";
import theme from "./theme/index";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
