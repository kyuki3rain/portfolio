import {
  Modal,
  Button,
  ModalContent,
  ModalBody,
  ModalHeader,
} from "@nextui-org/react";
import { useStatus } from "./statusState";
import { useMemo } from "react";

type Props = {
  time: number;
};

function ClearModal({ time }: Props) {
  const { resume, reset, status } = useStatus();
  const isOpen = useMemo(() => status === "clear", [status]);

  return (
    <Modal isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>Clear by {time} seconds!</ModalHeader>
        <ModalBody>
          <Button onClick={reset}>Restart</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ClearModal;
