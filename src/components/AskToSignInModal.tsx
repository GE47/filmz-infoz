import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const AskToSignInModal: React.FC<IProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  return (
    <Modal size="sm" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="gray.800">
        <ModalHeader>{t("Sign In")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{t("Sign in popup")}</ModalBody>
        <ModalFooter
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex">
            <Button
              as={Link}
              to="/signin"
              fontSize={{ base: "13px", md: "16px" }}
              mr="5px"
            >
              {t("Sign In")}
            </Button>
            <Button
              as={Link}
              to="/register"
              fontSize={{ base: "13px", md: "16px" }}
            >
              {t("Register")}
            </Button>
          </Box>
          <Button onClick={onClose} fontSize={{ base: "13px", md: "16px" }}>
            {t("Cancel")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AskToSignInModal;
