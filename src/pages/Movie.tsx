import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import Slider from "../components/Slider";
import MovieCard from "../components/Card/MovieCard";
import ActorCard from "../components/Card/ActorCard";
import MovieDetailCard from "../components/DetailCards/MovieDetailCard";

const Movie: React.FC = () => {
  const { id } = useParams();

  return (
    <Box>
      <MovieDetailCard
        name="Movie Name"
        rating={10}
        director="John Doe"
        description="something"
        ratingCount={500}
        imageUrl=""
      />
      <Slider title="Top Cast">
        <span>
          <ActorCard name="Actor's Name" id="10" imageUrl="" />
        </span>
      </Slider>
      <Slider title="Related Movies">
        <span>
          <MovieCard name="movie name" id="11" rating={8} imageUrl="" />
        </span>
        <span>
          <MovieCard name="movie name" id="12" rating={8} imageUrl="" />
        </span>
      </Slider>
    </Box>
  );
};

export default Movie;
