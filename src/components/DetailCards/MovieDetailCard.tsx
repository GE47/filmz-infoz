import { useState } from "react";
import { Badge, Box, Heading, Skeleton, Text, Image } from "@chakra-ui/react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Arrow } from "@egjs/flicking-plugins";

import Arrows from "../Carousel/Arrows";
import DetailsContainer from "./DetailsContainer";
import Rating from "../Rating";
import { MovieDetailsProps } from "../../store/movies/moviesSlice";
import { Link } from "react-router-dom";
import Bookmark from "../Bookmark";

const MovieDetailCard: React.FC<MovieDetailsProps & { id: string }> = ({
  title,
  description,
  rating,
  ratingCount,
  poster,
  backdrop,
  trailer,
  genres,
  length,
  id,
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
        pos="relative"
      >
        <Box w="full" h="full">
          <Skeleton h={{ base: "40vh", md: "50vh" }} isLoaded={isImageLoaded}>
            <Image
              src={
                poster
                  ? `https://image.tmdb.org/t/p/original/${poster}`
                  : backdrop
                  ? `https://image.tmdb.org/t/p/original/${backdrop} `
                  : "/assets/image_not_found.jpg"
              }
              w="full"
              h={{ base: "40vh", md: "50vh" }}
              onLoad={() => {
                setIsImageLoaded(true);
              }}
              pointerEvents="none"
              objectFit="contain"
              bg="gray.700"
            />
          </Skeleton>
        </Box>

        <Box
          w="full"
          h="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="white"
        >
          {trailer ? (
            <Skeleton
              w="full"
              h={{ base: "40vh", md: "50vh" }}
              isLoaded={isVideoLoaded}
            >
              <Box
                as="iframe"
                src={
                  trailer
                    ? `https://www.youtube.com/embed/${trailer}`
                    : undefined
                }
                title="Trailer"
                allowFullScreen
                onLoad={() => {
                  setIsVideoLoaded(true);
                }}
                w="full"
                h={{ base: "40vh", md: "50vh" }}
              />
            </Skeleton>
          ) : (
            <Text
              pos="absolute"
              textAlign="center"
              fontSize="25px"
              bottom="50%"
              w="full"
            >
              Trailer Not Found
            </Text>
          )}
        </Box>
        <ViewportSlot>
          <Arrows />
        </ViewportSlot>
      </Box>
      <Box
        alignSelf="flex-start"
        display="flex"
        flexDir="column"
        w={{ base: "100%", md: "50%" }}
        h="full"
        pl={{ base: "0", md: "10px" }}
        pt="10px"
        style={{ gap: "1rem" }}
      >
        <Box display="flex" alignItems="center" style={{ gap: "3px" }}>
          <Heading as="h3" fontSize="2xl">
            {title}
          </Heading>
          <Bookmark id={id} />
        </Box>
        <Text>{description}</Text>
        <Box>
          <Badge>Geners: </Badge>{" "}
          <Box display="inline-flex" alignItems="center" style={{ gap: "3px" }}>
            {genres.map((genre) => (
              <Badge
                as={Link}
                key={genre.id}
                to={`/genre/${genre.id}`}
                colorScheme="telegram"
              >
                {genre.name}
              </Badge>
            ))}
          </Box>
        </Box>

        <Box>
          <Badge>Rating: </Badge> <Rating value={rating} />
          <Text fontSize="12px" pl="50px" pt="3px">
            By <b>{ratingCount}</b> user
          </Text>
        </Box>

        <Box>
          <Badge>Duration: </Badge>{" "}
          <Text as="span">{length > 0 ? `${length} mins` : `Unknown`} </Text>
        </Box>
      </Box>
    </DetailsContainer>
  );
};

export default MovieDetailCard;
