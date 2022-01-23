import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import GridContainer from "../components/GridContainer";
import MovieCard from "../components/Card/MovieCard";
import { getMovieList, selectMovieList } from "../store/movies/moviesSlice";
import LoadingIndicator from "../components/LoadingIndicator";
import NotFound from "../components/404";
import { MOVIE_ITEMS } from "../constants";
import usePageData from "../hooks/usePageData";

const Movies = () => {
  const { type } = useParams();
  const item = MOVIE_ITEMS.find((movie) => movie.id === type);

  const { handleLoadMore } = usePageData(item?.id, type, getMovieList);

  const movieList = useSelector(selectMovieList);
  const totalPages = movieList.data.totalPages;
  const currentPage = movieList.data.page;

  if (movieList.status === "loading" && movieList.data.results.length === 0)
    return <LoadingIndicator />;

  if (!item) return <NotFound />;

  return (
    <GridContainer
      title={item.name}
      onLoadMore={() => handleLoadMore(totalPages)}
      showLoadMore={totalPages !== currentPage}
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
  );
};

export default Movies;
