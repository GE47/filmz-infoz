import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { debounce } from "underscore";

import GridContainer from "../components/GridContainer";
import ActorCard from "../components/Card/ActorCard";
import { selectActors, getPopularActors } from "../store/actors/actorsSlice";
import LoadingIndicator from "../components/LoadingIndicator";
import NotFound from "../components/404";

const Actors: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();

  const actorsList = useSelector(selectActors);
  const totalPages = actorsList.data.totalPages;
  const currentPage = actorsList.data.page;

  useEffect(() => {
    dispatch(getPopularActors({ page: pageNumber }));
  }, [dispatch, pageNumber]);

  const nextPage = () => {
    if (totalPages > pageNumber) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  };

  const handleLoadMore = debounce(nextPage, 500, true);

  if (actorsList.status === "loading" && actorsList.data.results.length === 0)
    return <LoadingIndicator />;

  if (actorsList.status === "error") return <NotFound />;

  return (
    <GridContainer
      title="Actors"
      onLoadMore={handleLoadMore}
      showLoadMore={totalPages !== currentPage}
    >
      {actorsList.data.results.map((actor) => (
        <ActorCard
          id={actor.id}
          key={actor.id}
          name={actor.name}
          imageUrl={actor.poster}
        />
      ))}
    </GridContainer>
  );
};

export default Actors;
