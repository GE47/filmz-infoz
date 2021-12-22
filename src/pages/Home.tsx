import { Box } from "@chakra-ui/react";
import MainCarousel from "../components/Carousel/MainCarousel";
import { useState, useEffect } from "react";

import Slider from "../components/Slider";
import MovieCard from "../components/Card/MovieCard";
import LoadingIndicator from "../components/LoadingIndicator";

type data = {
  id: number;
  url: string;
};

const Home = () => {
  const [images, setImages] = useState<data[] | null>(null);

  const fetchImages = async () => {
    try {
      const request = await fetch(
        "https://jsonplaceholder.typicode.com/albums/1/photos"
      );

      const response: data[] = await request.json();

      const result = response.filter((_, index) => index < 8);

      setImages(
        result.map((data) => {
          return { id: data.id, url: data.url };
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (!images) return <LoadingIndicator />;

  return (
    <Box>
      <MainCarousel items={images} />
      <Slider title="Popular Movies">
        {images.map((image) => (
          <span key={image.id}>
            <MovieCard
              name="movie name"
              id={image.id}
              rating={5}
              imageUrl={image.url}
            />
          </span>
        ))}
      </Slider>

      <Slider title="Top rated Movies">
        {images.map((image) => (
          <span key={image.id}>
            <MovieCard
              name="movie name"
              id={image.id}
              rating={8}
              imageUrl={image.url}
            />
          </span>
        ))}
      </Slider>
    </Box>
  );
};

export default Home;
