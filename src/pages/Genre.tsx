import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import GridContainer from "../components/GridContainer";
import MovieCard from "../components/Card/MovieCard";
import {
  selectMovieList,
  selectGenres,
  getMoviesByGenres,
} from "../store/movies/moviesSlice";
import LoadingIndicator from "../components/LoadingIndicator";
import usePageData from "../hooks/usePageData";
import NotFound from "../components/404";

const Genre = () => {
  const { id } = useParams();

  const genres = useSelector(selectGenres);

  const item = genres.data.find((genre) => genre.id.toString() === id);

  const { handleLoadMore } = usePageData(
    item?.id.toString(),
    id,
    getMoviesByGenres
  );

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

export default Genre;
