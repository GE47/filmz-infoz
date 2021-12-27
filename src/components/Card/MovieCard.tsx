import { Box } from "@chakra-ui/react";

import Bookmark from "../Bookmark";
import Rating from "../Rating";
import Card from "./index";

interface IProps {
  name: string;
  rating: number;
  id: string | number;
  imageUrl: string;
}

const MovieCard: React.FC<IProps> = ({ name, rating, id, imageUrl }) => {
  return (
    <Card path={`/movie/${id}`} title={name} imageUrl={imageUrl}>
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
