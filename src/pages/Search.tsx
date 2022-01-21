import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { debounce } from "underscore";

import GridContainer from "../components/GridContainer";
import LoadingIndicator from "../components/LoadingIndicator";
import MovieCard from "../components/Card/MovieCard";
import {
  getMoviesByKeywords,
  selectMovieList,
} from "../store/movies/moviesSlice";

const Search = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const movieList = useSelector(selectMovieList);
  const currentPage = movieList.data.page;
  const totalPages = movieList.data.totalPages;

  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;

    setSearchValue(query);
    dispatch(getMoviesByKeywords({ value: query, page: pageNumber }));
  }, [searchParams, dispatch, pageNumber]);

  const nextPage = () => {
    if (totalPages > pageNumber) {
      setPageNumber((prevNumber) => prevNumber + 1);
    }
  };

  const handleOnLoadMore = debounce(nextPage, 500, true);

  if (movieList.status === "loading" && movieList.data.results.length === 0)
    return <LoadingIndicator />;


  return (
    <Box>
      <i>
        {movieList.data.results.length === 0
          ? `No matches found for: ${searchValue}`
          : `Search results for: ${searchValue}`}
      </i>
      <GridContainer
        onLoadMore={handleOnLoadMore}
        showLoadMore={
          currentPage !== totalPages && movieList.data.results.length > 0
        }
      >
        {movieList.data.results.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            rating={movie.rating}
            poster={movie.poster}
            backdrop={movie.backdrop}
          />
        ))}
      </GridContainer>
    </Box>
  );
};

export default Search;
