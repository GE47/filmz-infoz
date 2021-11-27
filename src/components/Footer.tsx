import { Box, Divider, Stack, Text } from "@chakra-ui/react";
import { GoMarkGithub } from "react-icons/go";
import { FiLinkedin } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box>
      <Divider mb={5} mt={3} />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
      >
        <Stack direction="row" spacing={5}>
          <a href="https://github.com/GE47" target="_blank" rel="noreferrer">
            <GoMarkGithub size="30px" />
          </a>
          <a
            href="https://www.linkedin.com/in/alhasan-ali"
            target="_blank"
            rel="noreferrer"
          >
            <FiLinkedin size="30px" />
          </a>
        </Stack>
        <Text fontSize="15px" mt="5px">
          <b>@{currentYear}</b> Filmz Infoz
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
