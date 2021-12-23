import GridContainer from "../components/GridContainer";
import ActorCard from "../components/Card/ActorCard";

const Actors: React.FC = () => {
  return (
    <GridContainer title={`Actors`}>
      <ActorCard id="1" name="Actor's Name" imageUrl="" />
      <ActorCard id="1" name="Actor's Name" imageUrl="" />
      <ActorCard id="1" name="Actor's Name" imageUrl="" />
      <ActorCard id="1" name="Actor's Name" imageUrl="" />
      <ActorCard id="1" name="Actor's Name" imageUrl="" />
      <ActorCard id="1" name="Actor's Name" imageUrl="" />
      <ActorCard id="1" name="Actor's Name" imageUrl="" />
      <ActorCard id="1" name="Actor's Name" imageUrl="" />
      <ActorCard id="1" name="Actor's Name" imageUrl="" />
    </GridContainer>
  );
};

export default Actors;
