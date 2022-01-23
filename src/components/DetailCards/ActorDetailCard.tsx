import { Badge, Box, Heading, Skeleton, Text, Image } from "@chakra-ui/react";
import { useState } from "react";

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

  return (
    <DetailsContainer>
      <Box
        alignSelf="flex-start"
        mt={{ base: "0px", md: "10px" }}
        w={{ base: "100%", md: "50%" }}
        borderRadius="md"
      >
        <Skeleton
          h={{ base: "40vh", md: "full" }}
          borderRadius="md"
          isLoaded={isImageLoaded}
        >
          <Image
            src={
              poster
                ? `https://image.tmdb.org/t/p/original/${poster}`
                : "/assets/image_not_found.jpg"
            }
            w="full"
            borderRadius="md"
            h={{ base: "40vh", md: "50vh" }}
            objectFit="cover"
            onLoad={() => {
              setIsImageLoaded(true);
            }}
          />
        </Skeleton>
      </Box>

      <Box
        alignSelf="flex-start"
        display="flex"
        flexDir="column"
        w={{ base: "100%", md: "50%" }}
        h="full"
        pl={{ base: "0", md: "10px" }}
        pt="10px"
      >
        <Heading as="h3" fontSize="2xl" mb="1rem">
          {name}
        </Heading>

        {bio && (
          <Box mb="1rem">
            <Badge>Biography:</Badge>{" "}
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
              {showMore ? "Read Less" : "Read More"}
            </Text>
          </Box>
        )}

        {birthday && (
          <Box mb="1rem">
            <Badge>Birthday:</Badge>
            <Text as="span">
              {" "}
              {birthday}
              {deathday && (
                <span>
                  {" "}
                  To {deathday} <i>(deceased)</i>
                </span>
              )}
            </Text>
          </Box>
        )}

        <Box>
          <Badge>Gender:</Badge>
          <Text as="span"> {gender === 2 ? "male" : "female"}</Text>
        </Box>
      </Box>
    </DetailsContainer>
  );
};

export default ActorDetailCard;
