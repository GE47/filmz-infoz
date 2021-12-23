import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import GridContainer from "../components/GridContainer";
import MovieCard from "../components/Card/MovieCard";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string | null>(null);

  useEffect(() => {
    setSearchValue(searchParams.get("query"));
  }, [searchParams]);

  return (
    <Box>
      <i>Search results for: {searchValue}</i>
      <GridContainer>
        <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
        <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
        <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
        <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
        <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
        <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
        <MovieCard id="1" name="movie name" rating={8.7} imageUrl="" />
      </GridContainer>
    </Box>
  );
};

export default Search;
