import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Field } from "formik";

interface IProps {
  leftIcon?: ReactJSXElement | undefined;
  errorMessage: string | undefined;
  placeholder?: string | undefined;
  type?: string | undefined;
  name: string | undefined;
  label: string;
}

const FormInput: React.FC<IProps> = ({
  leftIcon,
  errorMessage,
  type,
  placeholder,
  name,
  label,
}) => {
  return (
    <Box mb="2rem">
      <FormControl>
        <FormLabel>{label} :</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={leftIcon} />

          <Input
            as={Field}
            name={name}
            variant="primary"
            type={type}
            placeholder={placeholder}
          />

          <InputRightElement
            pointerEvents="none"
            children={errorMessage ? <FaTimes color="#E53E3E" /> : undefined}
          />
        </InputGroup>
      </FormControl>
      <Text py="5px" h="10px" color="red.500">
        {errorMessage}
      </Text>
    </Box>
  );
};

export default FormInput;
