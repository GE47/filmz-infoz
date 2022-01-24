import { useState } from "react";
import { Badge, Box, Heading, Skeleton, Text, Image } from "@chakra-ui/react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Arrow } from "@egjs/flicking-plugins";
import { useTranslation } from "react-i18next";

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

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

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
              {t("Trailer Not Found")}
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
        style={{ direction: currentLanguage === "ar" ? "rtl" : "ltr" }}
      >
        <Box display="flex" alignItems="center" mb="1rem">
          <Heading as="h3" fontSize="2xl" mr="3px">
            {title}
          </Heading>
          <Bookmark
            id={id}
            title={title}
            rating={rating}
            poster={poster ? poster : backdrop}
          />
        </Box>

        <Text mb="1rem">{description}</Text>

        <Box mb="1rem">
          <Badge>{t("Genre")}: </Badge>{" "}
          <Box display="inline-flex" flexWrap="wrap" alignItems="center">
            {genres.map((genre) => (
              <Badge
                as={Link}
                key={genre.id}
                to={`/genre/${genre.id}`}
                colorScheme="telegram"
                variant="outline"
                mr="5px"
                my="5px"
              >
                {genre.name}
              </Badge>
            ))}
          </Box>
        </Box>

        <Box mb="1rem">
          <Badge>{t("Rating")}: </Badge> <Rating value={rating} />
          <Text
            fontSize="12px"
            pl={currentLanguage === "ar" ? 0 : "50px"}
            pr={currentLanguage === "ar" ? "50px" : 0}
            pt="3px"
          >
            {t("By")} <b>{ratingCount}</b> {t("user")}
          </Text>
        </Box>

        <Box>
          <Badge>{t("Duration")}: </Badge>{" "}
          <Text as="span">
            {length > 0 ? `${length} ${t("mins")}` : `Unknown`}{" "}
          </Text>
        </Box>
      </Box>
    </DetailsContainer>
  );
};

export default MovieDetailCard;
