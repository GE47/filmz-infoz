import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Badge,
  Box,
  Heading,
  Skeleton,
  Text,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { IoLogoYoutube } from "react-icons/io";

import { selectMovieTrailer } from "../../store/movies/moviesSlice";
import DetailsContainer from "./DetailsContainer";
import Rating from "../Rating";
import { MovieDetailsProps } from "../../store/movies/moviesSlice";
import { Link } from "react-router-dom";
import Bookmark from "../Bookmark";
import TrailerModal from "../TrailerModal";

const MovieDetailCard: React.FC<MovieDetailsProps & { id: string }> = ({
  title,
  description,
  rating,
  ratingCount,
  poster,
  backdrop,
  genres,
  length,
  id,
}) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const { onClose, onOpen, isOpen } = useDisclosure();

  const movieTrailer = useSelector(selectMovieTrailer);

  return (
    <DetailsContainer gap={{ base: 0, md: 3 }}>
      <Box
        borderRadius="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flex={{ base: 1, md: 2 }}
      >
        <Skeleton
          h={{ base: "40vh", md: "full" }}
          isLoaded={isImageLoaded}
          borderRadius="md"
        >
          <Image
            src={
              poster
                ? `https://image.tmdb.org/t/p/w500/${poster}`
                : backdrop
                ? `https://image.tmdb.org/t/p/w500/${backdrop} `
                : "/assets/image_not_found.jpg"
            }
            w="full"
            h={{ base: "40vh", md: "50vh" }}
            onLoad={() => {
              setIsImageLoaded(true);
            }}
            pointerEvents="none"
            objectFit="cover"
            borderRadius="md"
          />
        </Skeleton>
      </Box>

      <Box
        alignSelf="flex-start"
        display="flex"
        flexDir="column"
        h="full"
        pt="10px"
        style={{ direction: currentLanguage === "ar" ? "rtl" : "ltr" }}
        flex={{ base: 1, md: 4 }}
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

        <Box mb="1rem">
          <Badge>{t("Duration")}: </Badge>{" "}
          <Text as="span">
            {length > 0 ? `${length} ${t("mins")}` : `Unknown`}{" "}
          </Text>
        </Box>

        {movieTrailer.data && (
          <Box bg="none" display="flex" alignItems="center" gap={1}>
            <Badge>{t("Trailer")}: </Badge>
            <IoLogoYoutube
              cursor="pointer"
              size="30px"
              onClick={() => onOpen()}
            />
          </Box>
        )}
      </Box>

      <TrailerModal
        url={movieTrailer.data!}
        isOpen={isOpen}
        onClose={onClose}
      />
    </DetailsContainer>
  );
};

export default MovieDetailCard;
