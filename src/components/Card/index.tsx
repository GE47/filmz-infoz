import { Box, Image, Text, Skeleton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export interface IProps {
  title: string;
  path: string;
  alignCenter?: boolean | undefined;
  imageUrl: string;
}

const Card: React.FC<IProps> = ({
  path,
  alignCenter,
  title,
  imageUrl,
  children,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const naviagte = useNavigate();

  const handleCardClicked = (): void => {
    naviagte(path);
  };

  return (
    <Box
      position="relative"
      mx={2}
      borderRadius="md"
      overflow="hidden"
      onClick={handleCardClicked}
      cursor="pointer"
      _hover={{
        transition: ".2s ease-in-out",
        transform: "scale(1.02)",
      }}
    >
      <Skeleton
        isLoaded={imageLoaded}
        startColor="blue.800"
        endColor="gray.500"
      >
        <Image
          src={imageUrl}
          onLoad={() => setImageLoaded(true)}
          w={{ base: "110px", md: "250px" }}
          h={{ base: "110px", md: "200px" }}
          objectFit="cover"
          pointerEvents="none"
        />
      </Skeleton>
      <Box
        position="absolute"
        bottom="0"
        left="0"
        h="75px"
        bg="gray.600"
        opacity="0.8"
        w="full"
        display="flex"
        flexDir="column"
        px={2}
      >
        {alignCenter ? (
          <Text textAlign="center" noOfLines={2}>
            {title}
          </Text>
        ) : (
          <>
            <Text isTruncated pb={3}>
              {title}
            </Text>
            {children}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Card;
