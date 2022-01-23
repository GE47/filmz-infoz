import { useState } from "react";
import { Image, Skeleton, Button, Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MainCarouselProps } from "../../../store/movies/moviesSlice";

const CarouselImage: React.FC<MainCarouselProps> = ({ poster, id, title }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <Box pos="relative" w="full">
      <Skeleton isLoaded={isLoaded} borderRadius="md">
        <Image
          onLoad={() => setIsLoaded(true)}
          src={`https://image.tmdb.org/t/p/original/${poster}`}
          alt={`image n.${id}`}
          borderRadius="md"
          w="full"
          h={{ base: "200px", md: "500px" }}
          objectFit="cover"
          pointerEvents="none"
        />
      </Skeleton>
      <Button
        pos="absolute"
        top="50%"
        right={{ base: "20%", md: "15%" }}
        w={{ base: "60px", md: "100px" }}
        h={{ base: "20px", md: "40px" }}
        fontSize={{ base: "10", md: "15" }}
        as={Link}
        to={`/movie/${id}`}
      >
        More Info
      </Button>
      <Box
        w="full"
        display="flex"
        justifyContent="center"
        alignItems="center"
        pos="absolute"
        top="38%"
      >
        <Text
          fontSize={{ base: "0.6rem", md: "2rem" }}
          bg="gray.800"
          px="2"
          borderRadius="md"
          opacity="0.9"
        >
          {title}
        </Text>
      </Box>
    </Box>
  );
};

export default CarouselImage;
