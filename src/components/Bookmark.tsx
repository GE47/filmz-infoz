import { useDispatch, useSelector } from "react-redux";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiHeartAddLine, RiHeartAddFill } from "react-icons/ri";
import {
  addMovieBookmark,
  BookmarkProps,
  selectBookmarks,
  removeMovieBookmark,
} from "../store/bookmarks/bookmarksSlice";
import AskToSignInModal from "./AskToSignInModal";
import { auth } from "../firebase";

const Bookmark: React.FC<BookmarkProps> = ({ id, poster, rating, title }) => {
  const [isBookmarked, SetIsBookmarked] = useState(false);
  const { onClose, onOpen, isOpen } = useDisclosure();

  const dispatch = useDispatch();
  const bookmarks = useSelector(selectBookmarks);

  useEffect(() => {
    if (bookmarks.data.find((bookmark) => bookmark.id === id)) {
      SetIsBookmarked(true);
    } else {
      SetIsBookmarked(false);
    }
  }, [dispatch, bookmarks.data, id]);

  const handleBookmark = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    if (!auth.currentUser) {
      onOpen();
      e.stopPropagation();
      return;
    }

    const userId = auth.currentUser.uid;

    if (isBookmarked) {
      dispatch(removeMovieBookmark({ id, poster, rating, title, userId }));
    } else {
      dispatch(
        addMovieBookmark({
          id,
          poster,
          rating,
          title,
          userId,
        })
      );
    }

    e.stopPropagation();
  };

  return (
    <Button
      as={Box}
      cursor="pointer"
      disabled={bookmarks.status === "loading" ? true : false}
      onClick={(e) => handleBookmark(e)}
      bg="none"
      p="0"
      m="0"
      _hover={{ bg: "none" }}
    >
      {isBookmarked ? (
        <RiHeartAddFill size="25px" />
      ) : (
        <RiHeartAddLine size="25px" />
      )}
      <AskToSignInModal isOpen={isOpen} onClose={onClose} />
    </Button>
  );
};

export default Bookmark;
