import { useParams } from "react-router-dom";
const Movies = () => {
  const { type } = useParams();

  return <div>{type} Movies </div>;
};

export default Movies;
