import { Badge, Box, Heading, Skeleton, Text, Image } from "@chakra-ui/react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Arrow } from "@egjs/flicking-plugins";

import Arrows from "../Carousel/Arrows";
import DetailsContainer from "./DetailsContainer";
import Rating from "../Rating";
import { useState } from "react";

interface Iprops {
  name: string;
  description: string;
  director: string;
  rating: number;
  ratingCount: number;
  imageUrl: string;
  videoUrl?: string | undefined;
}

const MovieDetailCard: React.FC<Iprops> = ({
  name,
  description,
  director,
  rating,
  ratingCount,
  imageUrl,
  videoUrl,
}) => {
  const plugins = [new Arrow()];

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <DetailsContainer>
      <Box
        as={Flicking}
        w={{ base: "full", md: "50%" }}
        h="full"
        plugins={plugins}
        borderRadius="md"
      >
        <Box w="full" h="full">
          <Skeleton h={{ base: "40vh", md: "full" }} isLoaded={isImageLoaded}>
            <Image
              src={imageUrl}
              w="full"
              h="full"
              onLoad={() => {
                setIsImageLoaded(true);
              }}
            />
          </Skeleton>
        </Box>

        <Box
          w="full"
          h="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {videoUrl ? (
            <Skeleton
              w="full"
              h={{ base: "40vh", md: "full" }}
              isLoaded={isVideoLoaded}
            >
              <Box
                as="iframe"
                src={
                  videoUrl
                    ? `https://www.youtube.com/embed/${videoUrl}`
                    : undefined
                }
                title="Trailer"
                allowFullScreen
                onLoad={() => {
                  setIsVideoLoaded(true);
                }}
                w={{ base: "full", md: "full" }}
                h={{ base: "40vh", md: "full" }}
              />
            </Skeleton>
          ) : (
            <Text>Trailer Not Found</Text>
          )}
        </Box>
        <ViewportSlot>
          <Arrows />
        </ViewportSlot>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        alignItems="start"
        w={{ base: "100%", md: "50%" }}
        h="full"
        pl={{ base: "0", md: "10px" }}
        pt="10px"
        style={{ gap: "1rem" }}
      >
        <Heading as="h3" fontSize="2xl">
          {name}
        </Heading>
        <Text>
          {description} Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Quidem quo neque aperiam deserunt iste, quia deleniti quis quos
          enim labore similique distinctio voluptatem dolore eum, id rem,
          facilis quaerat?
        </Text>
        <Box>
          <Badge>Directed By: </Badge>
          <Text as="span"> {director}</Text>
        </Box>

        <Box>
          <Badge>Rating: </Badge> <Rating value={rating} />
          <Text fontSize="10px" pl="50px" pt="3px">
            By <i>{ratingCount}</i> users
          </Text>
        </Box>
      </Box>
    </DetailsContainer>
  );
};

export default MovieDetailCard;
