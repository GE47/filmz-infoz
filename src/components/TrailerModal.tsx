import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  ModalFooter,
} from "@chakra-ui/react";

import { useTranslation } from "react-i18next";

interface TrailerModalProps {
  url: string;
  isOpen: boolean;
  onClose: () => void;
}

const TrailerModal: React.FC<TrailerModalProps> = ({
  isOpen,
  onClose,
  url,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalOverlay />
        <ModalContent bg="gray.800" height={{ base: "50%", md: "80%" }}>
          <ModalBody>
            <iframe
              src={`https://www.youtube.com/embed/${url}`}
              title="Trailer"
              allowFullScreen
              width="100%"
              height="100%"
              frameBorder="0"
            />
          </ModalBody>
          <ModalFooter
            display={"flex"}
            alignItems="center"
            justifyContent="center"
          >
            <Button onClick={onClose} size="sm">
              {t("Close")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TrailerModal;
