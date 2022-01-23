import { useSelector } from "react-redux";

import GridContainer from "../components/GridContainer";
import MovieCard from "../components/Card/MovieCard";
import { selectBookmarks } from "../store/bookmarks/bookmarksSlice";

const Bookmarks = () => {
  const bookmarks = useSelector(selectBookmarks);

  return (
    <GridContainer title="Bookmarks" showLoadMore={false}>
      {bookmarks.data.map((bookmark) => (
        <MovieCard
          key={bookmark.id}
          title={bookmark.title}
          id={bookmark.id}
          poster={bookmark.poster}
          rating={bookmark.rating}
          backdrop=""
        />
      ))}
    </GridContainer>
  );
};

export default Bookmarks;
