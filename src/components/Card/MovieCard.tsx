import { Box, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import Bookmark from "../Bookmark";
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
        <CircularProgress value={rating} min={0} max={10} size="45px">
          <CircularProgressLabel>{rating}/10</CircularProgressLabel>
        </CircularProgress>
        <Bookmark id={id} />
      </Box>
    </Card>
  );
};

export default MovieCard;
