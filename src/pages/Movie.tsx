import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Slider from "../components/Slider";
import MovieCard from "../components/Card/MovieCard";
import ActorCard from "../components/Card/ActorCard";
import MovieDetailCard from "../components/DetailCards/MovieDetailCard";
import {
  getMovieDetails,
  getMovieTopCast,
  getMovieTrailer,
  getRelatedMovies,
  selectMovieDetails,
  selectRelatedMovies,
  selectMovieTopCast,
} from "../store/movies/moviesSlice";
import LoadingIndicator from "../components/LoadingIndicator";
import NotFound from "../components/404";

const Movie: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movieDetails = useSelector(selectMovieDetails);
  const relatedMovies = useSelector(selectRelatedMovies);
  const topCast = useSelector(selectMovieTopCast);
  const { t } = useTranslation();

  useEffect(() => {
    if (!id) return;

    dispatch(getMovieDetails({ id }));
    dispatch(getMovieTrailer({ id }));
    dispatch(getRelatedMovies({ id }));
    dispatch(getMovieTopCast({ id }));
  }, [id, dispatch]);

  if (
    movieDetails.status === "loading" ||
    relatedMovies.status === "loading" ||
    topCast.status === "loading"
  )
    return <LoadingIndicator />;

  if (
    movieDetails.status === "error" ||
    relatedMovies.status === "error" ||
    topCast.status === "error"
  )
    return <NotFound />;

  if (!id) return null;

  return (
    <Box>
      <MovieDetailCard
        title={movieDetails.data.title}
        rating={movieDetails.data.rating}
        description={movieDetails.data.description}
        ratingCount={movieDetails.data.ratingCount}
        poster={movieDetails.data.poster}
        backdrop={movieDetails.data.backdrop}
        genres={movieDetails.data.genres}
        length={movieDetails.data.length}
        trailer={movieDetails.data.trailer}
        id={id!}
      />
      {topCast.data.length > 0 && (
        <Slider title={t("Top Cast")}>
          {topCast.data.map((cast) => (
            <span key={cast.id}>
              <ActorCard name={cast.name} id={cast.id} imageUrl={cast.poster} />
            </span>
          ))}
        </Slider>
      )}

      {relatedMovies.data.length > 0 && (
        <Slider title={t("Related Movies")}>
          {relatedMovies.data.map((movie) => (
            <span key={movie.id}>
              <MovieCard
                id={movie.id}
                title={movie.title}
                rating={movie.rating}
                poster={movie.poster}
                backdrop={movie.backdrop}
              />
            </span>
          ))}
        </Slider>
      )}
    </Box>
  );
};

export default Movie;
