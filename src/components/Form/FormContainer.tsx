import {
  Container,
  Button,
  Heading,
  Box,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Form } from "formik";
import { Link } from "react-router-dom";
import { FormEventHandler } from "react";

interface IProps {
  errorMessage: string;
  title: string;
  linkText: string;
  linkPath: string;
  onSubmit?:
    | (FormEventHandler<HTMLDivElement> & FormEventHandler<HTMLFormElement>)
    | undefined;
}

const FormContainer: React.FC<IProps> = ({
  onSubmit,
  errorMessage,
  title,
  linkText,
  linkPath,
  children,
}) => {
  return (
    <Container
      maxW="lg"
      minH="80vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box bg="gray.700" borderRadius="lg" p="20px">
        <Box
          as={Form}
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          onSubmit={onSubmit}
        >
          <Heading mb="2rem">{title}</Heading>

          {errorMessage && (
            <Text color="red.500" fontSize="lg" mb="2rem">
              {errorMessage}
            </Text>
          )}

          {children}

          <Button alignSelf="center" type="submit" mb="2rem">
            Submit
          </Button>
          <ChakraLink as={Link} to={linkPath} fontSize="15px">
            {linkText}
          </ChakraLink>
        </Box>
      </Box>
    </Container>
  );
};

export default FormContainer;
