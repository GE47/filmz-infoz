import {
  Box,
  useDisclosure,
  Button,
  Stack,
  Link as ChakraLink,
  Text,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLanguage } from "react-icons/io5";

import SearchInput from "./SearchInput";
import { UserState } from "../../store/user/userSlice";

type item = { name: string; id: string };

interface IProps {
  movieItems: item[];
  genreItems: item[];
  languageItems: item[];
  onLanguageClicked: (id: string) => void;
  onSearch: (value: string) => void;
  onSignOut: () => void;
  currentUser: UserState["data"];
}

const NavBurger: React.FC<IProps> = ({
  movieItems,
  genreItems,
  languageItems,
  onLanguageClicked,
  onSearch,
  currentUser,
  onSignOut,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = (value: string) => {
    onSearch(value);
    onClose();
  };

  return (
    <Box display={{ base: "flex", md: "none" }}>
      <Button as={Text} cursor="pointer" onClick={onOpen} borderRadius="md">
        <GiHamburgerMenu />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="lg">
        <DrawerOverlay display={{ md: "none" }} />
        <DrawerContent display={{ md: "none" }} overflowY="auto">
          <DrawerCloseButton size="lg" />
          <DrawerBody as={Stack} fontSize="20" pt="10">
            {currentUser && <Text>Welcome, <i>{currentUser.email}</i></Text>}
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              pt="15px"
            >
              <SearchInput onSearch={handleSearch} width="full" />
            </Box>

            <ChakraLink variant="navItem" to="/" as={Link} onClick={onClose}>
              Home
            </ChakraLink>

            <ChakraLink
              variant="navItem"
              to="/actors"
              as={Link}
              onClick={onClose}
            >
              Actors
            </ChakraLink>

            {currentUser ? (
              <ChakraLink
                variant="navItem"
                to="/bookmarks"
                as={Link}
                onClick={onClose}
              >
                Bookmarks
              </ChakraLink>
            ) : null}

            <NavItemList
              items={movieItems}
              path="/movies"
              title="Movies"
              expand
              onClose={onClose}
            />

            <NavItemList
              items={genreItems}
              path={"/genre"}
              title="Genre"
              onClose={onClose}
            />

            <NavItemList
              items={languageItems}
              title={
                <Box as="span" display="flex" alignItems="center">
                  <Text fontSize="20" as="span">
                    Languages
                  </Text>
                  <IoLanguage />
                </Box>
              }
              onNavItemClicked={onLanguageClicked}
              onClose={onClose}
            />

            <Box display="flex" justifyContent="center" style={{ gap: 5 }}>
              {currentUser ? (
                <Button
                  w="150px"
                  bg="red.500"
                  _hover={{ bg: "red.600" }}
                  onClick={onSignOut}
                >
                  Sign Out
                </Button>
              ) : (
                <Button w="150px" as={Link} to="/signin" onClick={onClose}>
                  Sign In
                </Button>
              )}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

const NavItemList = (props: {
  items: item[];
  path?: string;
  title: JSX.Element | string;
  expand?: boolean;
  onNavItemClicked?: (id: string) => void;
  onClose: () => void;
}): JSX.Element => {
  const {
    items,
    path,
    title,
    onClose,
    onNavItemClicked = () => {},
    expand = false,
  } = props;

  const handleItemClicked = (id?: string) => {
    onClose();
    if (id) {
      onNavItemClicked(id);
    }
  };

  return (
    <Accordion allowToggle defaultIndex={expand ? [0] : []}>
      <AccordionItem borderWidth={0}>
        <AccordionButton px="1px" py="1px" fontSize="20" color="gray.300">
          {title}
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <Box display="flex" flexDir="column">
            {items.map((item) =>
              path ? (
                <ChakraLink
                  variant="navItem"
                  as={Link}
                  to={path + `/:${item.id}`}
                  key={item.id}
                  onClick={() => onClose()}
                >
                  {item.name}
                </ChakraLink>
              ) : (
                <ChakraLink
                  key={item.id}
                  variant="navItem"
                  onClick={() => handleItemClicked(item.id)}
                >
                  {item.name}
                </ChakraLink>
              )
            )}
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default NavBurger;
