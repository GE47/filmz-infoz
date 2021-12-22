import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { RiHeartAddLine, RiHeartAddFill } from "react-icons/ri";

const Bookmark: React.FC<{ id: string | number }> = ({ id }) => {
  const [isBookmarked, SetIsBookmarked] = useState(false);

  const handleBookmark = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    SetIsBookmarked(!isBookmarked);
    e.stopPropagation();
  };

  return (
    <Box cursor="pointer" onClick={(e) => handleBookmark(e)}>
      {isBookmarked ? (
        <RiHeartAddFill size="25px" />
      ) : (
        <RiHeartAddLine size="25px" />
      )}
    </Box>
  );
};

export default Bookmark;
