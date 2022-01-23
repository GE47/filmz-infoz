import Flicking from "@egjs/react-flicking";
import { Box, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const Slider: React.FC<{ title: string }> = ({ children, title }) => {
  const { i18n } = useTranslation();
  return (
    <Box pt={2}>
      <Heading style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
        {title}
      </Heading>
      <Box p={2} bg="gray.700" borderRadius="md">
        <Flicking align="prev" bound={true} horizontal={true} renderOnlyVisible>
          {children}
        </Flicking>
      </Box>
    </Box>
  );
};

export default Slider;
