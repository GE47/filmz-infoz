import Card from "./index";

interface IProps {
  name: string;
  id: string | number;
  imageUrl: string;
}

const ActorCard: React.FC<IProps> = ({ name, imageUrl, id }) => {
  return (
    <Card
      path={`/actor/${id}`}
      imageUrl={imageUrl}
      alignCenter={true}
      title={name}
    />
  );
};

export default ActorCard;
