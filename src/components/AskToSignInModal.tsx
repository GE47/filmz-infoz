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

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const AskToSignInModal: React.FC<IProps> = ({ isOpen, onClose }) => {
  return (
    <Modal size="sm" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="gray.800">
        <ModalHeader>Sign In</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Please sing in to add movies to your bookmark list
        </ModalBody>
        <ModalFooter
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" style={{ gap: "5px" }}>
            <Button
              as={Link}
              to="/signin"
              fontSize={{ base: "13px", md: "16px" }}
            >
              Sing In
            </Button>
            <Button
              as={Link}
              to="/register"
              fontSize={{ base: "13px", md: "16px" }}
            >
              Register
            </Button>
          </Box>
          <Button onClick={onClose} fontSize={{ base: "13px", md: "16px" }}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AskToSignInModal;
