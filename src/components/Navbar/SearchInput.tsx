import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Divider,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import { IoSearchSharp } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import {
  MoviesCardProps,
  clearSearchList,
} from "../../store/movies/moviesSlice";
import { Link } from "react-router-dom";

interface IProps {
  onSearchSubmit: (value: string) => void;
  onSearchChange: (value: string) => void;
  searchResults: MoviesCardProps[];
  onSearchItemClicked?: () => void;
  size?: "xs" | "sm" | "md" | "lg";
  width?: string & {};
}

const SearchInput: React.FC<IProps> = ({
  onSearchSubmit,
  onSearchChange,
  searchResults,
  onSearchItemClicked = () => {},
  size = "md",
  width = { base: "180px", md: "160px", lg: "180px" },
}) => {
  const [value, setValue] = useState<string>("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch = useDispatch();

  const handleValueChange = (searchValue: string) => {
    setValue(searchValue);
    onSearchChange(searchValue);
  };

  const handleSearch = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    onSearchSubmit(value);
    setValue("");
  };

  return (
    <Box pos="relative" width={width}>
      <InputGroup w={width} size={size} as="form" onSubmit={handleSearch}>
        <Input
          placeholder="Search movie"
          variant="primary"
          value={value}
          onChange={(e) => handleValueChange(e.target.value)}
        />

        <InputRightElement
          cursor="pointer"
          display="flex"
          justifyContent="center"
          color="black"
        >
          {value && <FaTimes onClick={() => setValue("")} size="12px" />}
          <Divider orientation="vertical" mx="2px" pl="2px" />

          <Box as="button" type="submit">
            <IoSearchSharp />
          </Box>
        </InputRightElement>
      </InputGroup>
      {value && searchResults.length > 0 && (
        <Box
          pos="absolute"
          w="full"
          h="20vh"
          bg="gray.100"
          overflowY="scroll"
          zIndex={999}
          borderBottomRadius="sm"
          top="90%"
        >
          {searchResults.map((result) => (
            <Box
              as={Link}
              to={`/movie/${result.id}`}
              onClick={() => {
                setValue("");
                dispatch(clearSearchList());
                onSearchItemClicked();
              }}
              display="flex"
              alignItems="center"
              mb="1px"
              key={result.id}
              _hover={{ bg: "gray.300" }}
            >
              <Skeleton isLoaded={imageLoaded} w="80px" h="85px">
                <Image
                  src={
                    result.poster
                      ? `https://image.tmdb.org/t/p/w200/${result.poster}`
                      : result.backdrop
                      ? `https://image.tmdb.org/t/p/w200/${result.backdrop}`
                      : "/assets/image_not_found.jpg"
                  }
                  onLoad={() => setImageLoaded(true)}
                  objectFit="contain"
                  w="80px"
                  h="85px"
                />
              </Skeleton>
              <Text
                w="90%"
                color="black"
                fontSize="xs"
                isTruncated
                justifySelf="start"
                ml="5px"
              >
                {result.title}
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
export default SearchInput;
