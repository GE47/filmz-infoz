import { useParams } from "react-router-dom";

import ActorDetailCard from "../components/DetailCards/ActorDetailCard";
import Slider from "../components/Slider";
import MovieCard from "../components/Card/MovieCard";

const Actor: React.FC = () => {
  const { id } = useParams();

  return (
    <div>
      <ActorDetailCard
        bio="something"
        name="Jane"
        gender={1}
        birthday="1999-9-9"
        deathday="2034-29-2"
        imageUrl=""
      />

      <Slider title="Participated In">
        <span>
          <MovieCard name="movie name" id="10" rating={8} imageUrl="" />
        </span>
        <span>
          <MovieCard name="movie name" id="11" rating={8} imageUrl="" />
        </span>
        <span>
          <MovieCard name="movie name" id="12" rating={8} imageUrl="" />
        </span>
        <span>
          <MovieCard name="movie name" id="13" rating={8} imageUrl="" />
        </span>
      </Slider>
    </div>
  );
};

export default Actor;
