import { Box } from "@chakra-ui/react";

import Bookmark from "../Bookmark";
import Rating from "../Rating";
import Card from "./index";
import { MoviesCardProps } from "../../store/movies/moviesSlice";

const MovieCard: React.FC<MoviesCardProps> = ({
  title,
  rating,
  id,
  poster,
  backdrop,
}) => {
  return (
    <Card
      path={`/movie/${id}`}
      title={title}
      imageUrl={poster ? poster : backdrop}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        w="full"
        pb="5px"
      >
        <Rating value={rating} />
        <Bookmark id={id} />
      </Box>
    </Card>
  );
};

export default MovieCard;
