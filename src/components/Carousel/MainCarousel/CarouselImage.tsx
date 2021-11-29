import { useState } from "react";
import { Image, Skeleton, Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface IProps {
  src: string;
  id: number;
}

const CarouselImage: React.FC<IProps> = ({ src, id }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <Box pos="relative" w="full">
      <Skeleton
        isLoaded={isLoaded}
        borderRadius="md"
        startColor="blue.800"
        endColor="gray.500"
      >
        <Image
          onLoad={() => setIsLoaded(true)}
          src={src}
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
    </Box>
  );
};

export default CarouselImage;
