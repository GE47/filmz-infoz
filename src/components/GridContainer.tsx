import { Box, Heading, Button, SimpleGrid } from "@chakra-ui/react";

interface Iprops {
  title?: string | undefined;
  onLoadMore?: () => void;
  showLoadMore?: boolean;
}

const GridContainer: React.FC<Iprops> = ({
  children,
  title,
  onLoadMore,
  showLoadMore = true,
}) => {
  return (
    <Box display="flex" flexDir="column">
      <Heading as="h2" fontSize="2xl" pb={2}>
        {title}
      </Heading>

      <SimpleGrid
        columns={{ base: 2, sm: 3 }}
        spacing="20px"
        justifyItems="center"
      >
        {children}
      </SimpleGrid>
      {showLoadMore && (
        <Button onClick={onLoadMore} alignSelf="center" mt={5}>
          Load More
        </Button>
      )}
    </Box>
  );
};

export default GridContainer;
