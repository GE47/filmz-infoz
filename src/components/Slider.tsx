import Flicking from "@egjs/react-flicking";
import { Box, Heading } from "@chakra-ui/react";

const Slider: React.FC<{ title: string }> = ({ children, title }) => {
  return (
    <Box pt={2}>
      <Heading>{title}</Heading>
      <Box p={2} bg="gray.700" borderRadius="md">
        <Flicking align="prev" bound={true} horizontal={true}>
          {children}
        </Flicking>
      </Box>
    </Box>
  );
};

export default Slider;
