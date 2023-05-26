import { Box } from "@chakra-ui/react";

const DetailsContainer = ({
  children,
  gap,
}: {
  children: React.ReactNode;
  gap?: number | string | undefined | object;
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      minH={{ base: "full", md: "30vh" }}
      flexDir={{ base: "column", md: "row" }}
      gap={gap}
    >
      {children}
    </Box>
  );
};

export default DetailsContainer;
