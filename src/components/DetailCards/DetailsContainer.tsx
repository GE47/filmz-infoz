import { Box } from "@chakra-ui/react";

const DetailsContainer: React.FC = ({ children }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      h={{ base: "full", md: "30vh" }}
      flexDir={{ base: "column", md: "row" }}
    >
      {children}
    </Box>
  );
};

export default DetailsContainer;
