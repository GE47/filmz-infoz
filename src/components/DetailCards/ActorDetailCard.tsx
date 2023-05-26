import { Badge, Box, Heading, Skeleton, Text, Image } from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import DetailsContainer from "./DetailsContainer";
import { ActorProps } from "../../store/actors/actorsSlice";

const ActorDetailCard: React.FC<ActorProps> = ({
  name,
  bio,
  birthday,
  deathday,
  poster,
  gender,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

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
          borderRadius="md"
          isLoaded={isImageLoaded}
        >
          <Image
            src={
              poster
                ? `https://image.tmdb.org/t/p/w500/${poster}`
                : "/assets/image_not_found.jpg"
            }
            w="full"
            h={{ base: "40vh", md: "50vh" }}
            onLoad={() => {
              setIsImageLoaded(true);
            }}
            objectFit="cover"
            pointerEvents="none"
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
        <Heading as="h3" fontSize="2xl" mb="1rem">
          {name}
        </Heading>

        {bio && (
          <Box mb="1rem">
            <Badge>{t("Biography")}:</Badge>{" "}
            <Text as="span" noOfLines={showMore ? undefined : 8}>
              {bio}
            </Text>
            <Text
              as="span"
              fontSize="10px"
              cursor="pointer"
              textColor="blue.300"
              onClick={() => setShowMore((prevState) => !prevState)}
            >
              {" "}
              {showMore ? t("Read Less") : t("Read More")}
            </Text>
          </Box>
        )}

        {birthday && (
          <Box mb="1rem">
            <Badge>{t("Birthday")}:</Badge>
            <Text as="span">
              {" "}
              {birthday}
              {deathday && (
                <span>
                  {" "}
                  {t("To")} {deathday} <i>({t("deceased")})</i>
                </span>
              )}
            </Text>
          </Box>
        )}

        <Box>
          <Badge>{t("Gender")}:</Badge>
          <Text as="span"> {gender === 2 ? t("Male") : t("Female")}</Text>
        </Box>
      </Box>
    </DetailsContainer>
  );
};

export default ActorDetailCard;
