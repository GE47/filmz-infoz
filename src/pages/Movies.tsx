import { useParams } from "react-router-dom";

import GridContainer from "../components/GridContainer";
import MovieCard from "../components/Card/MovieCard";

const Movies = () => {
  const { type } = useParams();

  return (
    <GridContainer title={`${type} Movies`}>
      <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
      <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
      <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
      <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
      <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
      <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
      <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
      <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
      <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
      <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
      <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
      <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
      <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
      <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
    </GridContainer>
  );
};

export default Movies;
