import { extendTheme } from "@chakra-ui/react";

import { fonts, styles, colors } from "./styles";
import components from "./components";

const overrides = {
  styles,
  colors,
  fonts,
  components,
};

const theme = extendTheme(overrides);

export default theme;
