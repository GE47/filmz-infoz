import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

import Slider from "../components/Slider";
import MovieCard from "../components/Card/MovieCard";
import LoadingIndicator from "../components/LoadingIndicator";
import MainCarousel from "../components/Carousel/MainCarousel";
import {
  selectCarouselMovies,
  selectPopularSlider,
  selectTopSlider,
} from "../store/movies/moviesSlice";

const Home = () => {
  const mainCarouselMovies = useSelector(selectCarouselMovies);
  const popularMovies = useSelector(selectPopularSlider);
  const topRatedMovies = useSelector(selectTopSlider);

  if (
    mainCarouselMovies.status === "loading" ||
    popularMovies.status === "loading" ||
    topRatedMovies.status === "loading"
  )
    return <LoadingIndicator />;

  return (
    <Box>
      <MainCarousel items={mainCarouselMovies.data} />

      <Slider title="Popular Movies">
        {popularMovies.data.map((movie) => (
          <span key={movie.id}>
            <MovieCard
              title={movie.title}
              id={movie.id}
              rating={movie.rating}
              poster={movie.poster}
              backdrop={movie.backdrop}
            />
          </span>
        ))}
      </Slider>

      <Slider title="Top Rated Movies">
        {topRatedMovies.data.map((movie) => (
          <span key={movie.id}>
            <MovieCard
              title={movie.title}
              id={movie.id}
              rating={movie.rating}
              poster={movie.poster}
              backdrop={movie.backdrop}
            />
          </span>
        ))}
      </Slider>
    </Box>
  );
};

export default Home;
