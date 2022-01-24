import { useSelector, useDispatch } from "react-redux";
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
import { FiChevronDown } from "react-icons/fi";
import { IoLanguage } from "react-icons/io5";
import { debounce } from "underscore";
import { useTranslation } from "react-i18next";

import NavSelect from "./NavSelect";
import NavBurger from "./NavBurger";
import SearchInput from "./SearchInput";
import { selectUserData, signOut } from "../../store/user/userSlice";
import { MOVIE_ITEMS } from "../../constants";
import {
  getMoviesOnSearch,
  selectGenres,
  selectSearchList,
} from "../../store/movies/moviesSlice";

const languageItems = [
  { name: "English", id: "en" },
  { name: "Arabic", id: "ar" },
];

const NavBar = () => {
  const currentUser = useSelector(selectUserData);
  const dispatch = useDispatch();
  const genres = useSelector(selectGenres);
  const searchList = useSelector(selectSearchList);
  const { t, i18n } = useTranslation();

  const debouncedDispatch = debounce(dispatch, 400);

  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const handleLanguageChange = (id: any): void => {
    i18n.changeLanguage(id);
  };

  const handleSearchSubmit = (value: string): void => {
    if (value) navigate(`/search?${createSearchParams({ query: value })}`);
  };

  const handleSearchChange = (value: string): void => {
    debouncedDispatch(getMoviesOnSearch({ value }));
  };

  return (
    <Box pb={3}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        py={3}
      >
        <Heading
          as={Link}
          to="/"
          flexGrow={4}
          fontSize={{ base: "xl", md: "3xl", lg: "4xl" }}
        >
          Filmz Infoz
        </Heading>

        <Box
          direction="row"
          justifyContent="space-between"
          flexGrow={1}
          h="full"
          alignItems="center"
          display={{ base: "none", md: "flex" }}
          fontSize={{ md: "12px", lg: "16px" }}
        >
          <ChakraLink as={Link} to="/" boxShadow="0" mr={{ md: "3px" }}>
            {t("Home")}
          </ChakraLink>

          <NavSelect title={t("Genre")} items={genres.data} path="/genre" />

          <NavSelect title={t("Movies")} items={MOVIE_ITEMS} path="/movies" />

          <ChakraLink as={Link} to="/actors">
            {t("Actors")}
          </ChakraLink>

          {currentUser && (
            <ChakraLink as={Link} to="/bookmarks" mx="3px">
              {t("Bookmarks")}
            </ChakraLink>
          )}

          <SearchInput
            searchResults={searchList.data}
            onSearchChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
            size="sm"
          />

          {currentUser ? (
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
                  {currentUser.email} <FiChevronDown />
                </Text>
              </MenuButton>
              <MenuList zIndex={999}>
                <MenuItem onClick={handleSignOut}>
                  <Text
                    textAlign="center"
                    w="full"
                    bg="red.500"
                    borderRadius="lg"
                    borderWidth="thin"
                    p="5px"
                  >
                    {t("Sign Out")}
                  </Text>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link to="/signin">
              <Button size="sm" p="10px" h="auto">
                {t("Sign In")}
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
          movieItems={MOVIE_ITEMS}
          genreItems={genres.data}
          languageItems={languageItems}
          currentUser={currentUser}
          onLanguageClicked={handleLanguageChange}
          onSearchSubmit={handleSearchSubmit}
          onSearchChange={handleSearchChange}
          searchResults={searchList.data}
          onSignOut={handleSignOut}
        />
      </Box>
      <Divider />
    </Box>
  );
};

export default NavBar;
