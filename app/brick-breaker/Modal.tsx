import {
  Modal,
  Button,
  ModalContent,
  ModalBody,
  ModalHeader,
} from "@nextui-org/react";
import { useStatus } from "./statusState";
import { useMemo } from "react";

function MyModal() {
  const { resume, reset, status } = useStatus();
  const isOpen = useMemo(() => status === "pause", [status]);

  return (
    <Modal isOpen={isOpen} onOpenChange={resume}>
      <ModalContent>
        <ModalHeader>Pause</ModalHeader>
        <ModalBody>
          <Button onClick={resume}>Resume</Button>
          <Button onClick={reset}>Reset</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MyModal;
