import { useParams } from "react-router-dom";
const Actor: React.FC = () => {
  const { id } = useParams();

  return <h1>Actor {id}</h1>;
};

export default Actor;
