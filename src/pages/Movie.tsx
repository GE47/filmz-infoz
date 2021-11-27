import { useParams } from "react-router-dom";

const Movie: React.FC = () => {
  const { id } = useParams();

  return <h1>Movie {id}</h1>;
};

export default Movie;
