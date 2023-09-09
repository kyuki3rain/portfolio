"use client";

import { useCallback, useState } from "react";
import { useHeight } from "../states/height";
import Tower from "./Tower";
import { Button } from "@nextui-org/button";
import RedoIcon from "../icons/RedoIcon";
import UndoIcon from "../icons/UndoIcon";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

type Props = {
  height: number;
};

type State = {
  a: number[];
  b: number[];
  c: number[];
};
export type TowerType = keyof State;

function GameView({ height }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [state, setState] = useState({
    a: Array.from({ length: height }, (_, i) => height - i - 1),
    b: [] as number[],
    c: [] as number[],
  });
  const [logs, setLogs] = useState<{ from: TowerType; to: TowerType }[]>([]);
  const [index, setIndex] = useState(0);
  const [from, setFrom] = useState<TowerType | null>(null);
  const [clear, setClear] = useState(false);

  const move = useCallback(
    (from: TowerType, to: TowerType, logging: boolean = true) => {
      const fromState = state[from];
      const toState = state[to];
      if (fromState.length === 0) return;

      const fromTop = fromState[fromState.length - 1];
      if (fromTop === undefined) return;
      const toTop = toState[toState.length - 1];
      if (toTop !== undefined && fromTop > toTop) return;

      toState.push(fromState.pop()!);
      setState({ ...state, [from]: fromState, [to]: toState });
      if (logging === true) {
        setLogs([...logs.slice(0, index), { from, to }]);
        setIndex(index + 1);
      }

      if (to !== "a" && toState.length === height) {
        setClear(true);
        onOpen();
      }
    },
    [state, height, logs, index, onOpen]
  );

  const undo = useCallback(() => {
    if (index === 0) return;

    const log = logs[index - 1];
    move(log.to, log.from, false);
    setIndex(index - 1);
    setFrom(null);
    setClear(false);
  }, [index, logs, move]);

  const redo = useCallback(() => {
    if (index === logs.length) return;

    const log = logs[index];
    move(log.from, log.to, false);
    setIndex(index + 1);
    setFrom(null);
  }, [index, logs, move]);

  const reset = useCallback(() => {
    setState({
      a: Array.from({ length: height }, (_, i) => height - i - 1),
      b: [] as number[],
      c: [] as number[],
    });
    setLogs([]);
    setIndex(0);
    setFrom(null);
    setClear(false);
  }, [height]);

  const onClick = useCallback(
    (tower: TowerType) => {
      if (clear === true) return;

      if (from === null) {
        setFrom(tower);
      } else {
        move(from, tower);
        setFrom(null);
      }
    },
    [clear, from, move]
  );

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-around w-screen p-10">
        <Tower
          type="a"
          floors={state.a}
          onClick={() => onClick("a")}
          className="bg-red-100"
        ></Tower>
        <Tower
          type="b"
          floors={state.b}
          onClick={() => onClick("b")}
          className="bg-green-100"
        ></Tower>
        <Tower
          type="c"
          floors={state.c}
          onClick={() => onClick("c")}
          className="bg-blue-100"
        ></Tower>
      </div>
      <div className="flex flex-row">
        <Button
          isIconOnly
          color="danger"
          aria-label="Like"
          className="mx-4"
          onClick={undo}
        >
          <UndoIcon />
        </Button>
        <div className="text-4xl">Count: {index}</div>
        <Button
          isIconOnly
          color="danger"
          aria-label="Like"
          className="mx-4"
          onClick={redo}
        >
          <RedoIcon />
        </Button>
        <Button
          color="danger"
          aria-label="Like"
          className="mx-4"
          onClick={reset}
        >
          リセット
        </Button>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p>Clear!</p>
              </ModalHeader>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    reset();
                  }}
                >
                  Reset
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default function Game() {
  const { height } = useHeight();

  return <GameView height={height} key={height}></GameView>;
}
