import { Badge, Box, Heading, Skeleton, Text, Image } from "@chakra-ui/react";

import DetailsContainer from "./DetailsContainer";
import { useState } from "react";

interface Iprops {
  name: string;
  bio: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  imageUrl: string;
}

const ActorDetailCard: React.FC<Iprops> = ({
  name,
  bio,
  birthday,
  deathday,
  imageUrl,
  gender,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <DetailsContainer>
      <Box w={{ base: "100%", md: "50%" }} h="full" borderRadius="md">
        <Skeleton
          h={{ base: "40vh", md: "full" }}
          borderRadius="md"
          isLoaded={isImageLoaded}
        >
          <Image
            src={imageUrl}
            w="full"
            h={{ base: "40vh", md: "full" }}
            onLoad={() => {
              setIsImageLoaded(true);
            }}
          />
        </Skeleton>
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

        <Box>
          <Badge>Biography:</Badge>{" "}
          <Text as="span">
            {bio} Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Quidem quo neque aperiam deserunt iste, quia deleniti quis quos enim
            labore similique distinctio voluptatem dolore eum, id rem, facilis
            quaerat?
          </Text>
        </Box>

        <Box>
          <Badge>Birthday:</Badge>
          <Text as="span">
            {" "}
            {birthday}
            {deathday ? (
              <span>
                {" "}
                To {deathday} <i>(deceased)</i>
              </span>
            ) : (
              ""
            )}
          </Text>
        </Box>

        <Box>
          <Badge>Gender:</Badge>
          <Text as="span"> {gender === 2 ? "male" : "female"}</Text>
        </Box>
      </Box>
    </DetailsContainer>
  );
};

export default ActorDetailCard;
