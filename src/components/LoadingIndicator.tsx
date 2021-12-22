import { Box, Spinner } from "@chakra-ui/react";
const LoadingIndicator = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" h="80vh">
      <Spinner />
    </Box>
  );
};

export default LoadingIndicator;
