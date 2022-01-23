import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface IProps {
  title: string | JSX.Element;
  items: { name: string; id: string | number }[];
  path?: string;
  onItemClicked?: (id: string | number) => void;
}

const NavSelect: React.FC<IProps> = ({
  title,
  items,
  path = "",
  onItemClicked = () => {},
}) => {
  const { t } = useTranslation();
  return (
    <Menu autoSelect={false} gutter={2} placement="auto">
      <MenuButton as={Box} cursor="pointer">
        <Text display="inline-flex" alignItems="center" h="10">
          {title} <FiChevronDown />
        </Text>
      </MenuButton>

      <MenuList zIndex={10}>
        {items.map((item, index) =>
          path ? (
            <MenuItem key={index} as={Link} to={`${path}/${item.id}`}>
              <ChakraLink as="span" textAlign="center" w="full">
                {t(item.name)}
              </ChakraLink>
            </MenuItem>
          ) : (
            <MenuItem key={index} onClick={() => onItemClicked(item.id)}>
              <ChakraLink textAlign="center" w="full">
                {item.name}
              </ChakraLink>
            </MenuItem>
          )
        )}
      </MenuList>
    </Menu>
  );
};

export default NavSelect;
