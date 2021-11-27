import { useState } from "react";
import {
  InputGroup,
  Input,
  InputRightElement,
  Divider,
} from "@chakra-ui/react";
import { IoSearchSharp } from "react-icons/io5";

interface IProps {
  onSearch: (value: string) => void;
  size?: "xs" | "sm" | "md" | "lg";
  width?: string & {};
}

const SearchInput: React.FC<IProps> = ({
  onSearch,
  size = "md",
  width = { base: "180px", md: "160px", lg: "180px" },
}) => {
  const [value, setValue] = useState<string>("");

  const handleValueChange = (searchValue: string) => {
    setValue(searchValue);
  };

  const handleSearch = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    onSearch(value);
    setValue("");
  };

  return (
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
        style={{ gap: 5 }}
        color="black"
        as="button"
        type="submit"
      >
        <Divider orientation="vertical" />
        <IoSearchSharp />
      </InputRightElement>
    </InputGroup>
  );
};
export default SearchInput;
