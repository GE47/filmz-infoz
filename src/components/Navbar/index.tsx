import {
  Box,
  Button,
  Divider,
  Heading,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { IoLanguage } from "react-icons/io5";

import NavSelect from "./NavSelect";
import NavBurger from "./NavBurger";
import SearchInput from "./SearchInput";

const movieItems = [
  { name: "Popular", id: "popular" },
  { name: "Latest", id: "latest" },
  { name: "Top Rated", id: "top_rated" },
  { name: "Upcoming", id: "upcoming" },
  { name: "Now Playing", id: "now_playing" },
];

const genreItems = [
  { name: "Action", id: "28" },
  { name: "Drama", id: "50" },
  { name: "Comedy", id: "10" },
];

const languageItems = [
  { name: "English", id: "en" },
  { name: "Arabic", id: "ar" },
];

const NavBar = () => {
  const [isLoggedIn] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleLanguageChange = (id: string): void => {};

  const handleSearch = (value: string): void => {
    if (value) navigate(`/search?${createSearchParams({ query: value })}`);
  };

  return (
    <Box pb={3}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        py={3}
      >
        <Link to="/">
          <Heading flexGrow={1} fontSize={{ base: "xl", md: "3xl", lg: "4xl" }}>
            Filmz Infoz
          </Heading>
        </Link>

        <Box
          direction="row"
          style={{ gap: 10 }}
          h="full"
          alignItems="center"
          display={{ base: "none", md: "flex" }}
        >
          <ChakraLink as={Link} to="/" boxShadow="0">
            Home
          </ChakraLink>

          <NavSelect title="Genre" items={genreItems} path="/genre" />

          <NavSelect title="Movies" items={movieItems} path="/movies" />

          <ChakraLink as={Link} to="/actors">
            Actors
          </ChakraLink>

          <SearchInput onSearch={handleSearch} size="sm" />

          {isLoggedIn ? (
            <Menu autoSelect={false} placement="auto" gutter={7}>
              <MenuButton as={Box} cursor="pointer">
                <Text
                  display="inline-flex"
                  alignItems="center"
                  border="solid"
                  color="blue.300"
                  borderWidth={1}
                  borderRadius="md"
                  px="5px"
                >
                  UserName <FiChevronDown />
                </Text>
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <ChakraLink
                    textAlign="center"
                    w="full"
                    as={Link}
                    to="/bookmarks"
                  >
                    Bookmarks
                  </ChakraLink>
                </MenuItem>
                <MenuItem>
                  <Text
                    textAlign="center"
                    w="full"
                    bg="red.500"
                    borderRadius="lg"
                    borderWidth="thin"
                    p="5px"
                  >
                    Sign out
                  </Text>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link to="/signin">
              <Button size="sm" p="10px" h="auto">
                Sign In
              </Button>
            </Link>
          )}

          <NavSelect
            title={
              <Box as="span" fontSize="20">
                <IoLanguage />
              </Box>
            }
            items={languageItems}
            onItemClicked={handleLanguageChange}
          />
        </Box>

        <NavBurger
          movieItems={movieItems}
          genreItems={genreItems}
          languageItems={languageItems}
          onLanguageClicked={handleLanguageChange}
          onSearch={handleSearch}
        />
      </Box>
      <Divider />
    </Box>
  );
};

export default NavBar;