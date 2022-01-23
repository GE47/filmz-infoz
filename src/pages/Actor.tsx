import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ActorDetailCard from "../components/DetailCards/ActorDetailCard";
import Slider from "../components/Slider";
import MovieCard from "../components/Card/MovieCard";
import {
  selectActorDetails,
  getActorDetails,
  getActorParticipations,
  selectActorParticipations,
} from "../store/actors/actorsSlice";
import { useEffect } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import NotFound from "../components/404";

const Actor: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const actorDetails = useSelector(selectActorDetails);
  const actorParticipations = useSelector(selectActorParticipations);

  useEffect(() => {
    if (!id) return;

    dispatch(getActorDetails({ id }));
    dispatch(getActorParticipations({ id }));
  }, [dispatch, id]);

  if (
    actorDetails.status === "loading" ||
    actorParticipations.status === "loading"
  )
    return <LoadingIndicator />;

  if (actorDetails.status === "error" || actorParticipations.status === "error")
    return <NotFound />;

  if (!id) return null;

  return (
    <div>
      <ActorDetailCard
        bio={actorDetails.data.bio}
        name={actorDetails.data.name}
        gender={actorDetails.data.gender}
        birthday={actorDetails.data.birthday}
        deathday={actorDetails.data.deathday}
        poster={actorDetails.data.poster}
      />

      {actorParticipations.data.length > 0 && (
        <Slider title="Participated In">
          {actorParticipations.data.map((movie) => (
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
      )}
    </div>
  );
};

export default Actor;
