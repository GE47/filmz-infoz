import { Box, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="column"
      h="50vh"
    >
      <Text fontSize="2xl" mb="10px">
        Page is not found.
      </Text>
      <Button as={Link} to="/">
        Return
      </Button>
    </Box>
  );
};

export default NotFound;
