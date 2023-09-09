"use client";

import { useState } from "react";
import { useHeight } from "../states/height";
import Tower from "./Tower";

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
  const [state, setState] = useState({
    a: Array.from({ length: height }, (_, i) => height - i - 1),
    b: [] as number[],
    c: [] as number[],
  });
  const [from, setFrom] = useState<TowerType | null>(null);
  const [count, setCount] = useState(0);

  const move = (from: TowerType, to: TowerType) => {
    const fromState = state[from];
    const toState = state[to];
    if (fromState.length === 0) return;

    toState.push(fromState.pop()!);
    setState({ ...state, [from]: fromState, [to]: toState });
    setCount(count + 1);
  };

  const onClick = (tower: TowerType) => {
    if (from === null) {
      setFrom(tower);
    } else {
      move(from, tower);
      setFrom(null);
    }
  };

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
      <div className="text-4xl">Count: {count}</div>
    </div>
  );
}

export default function Game() {
  const { height } = useHeight();

  return <GameView height={height} key={height}></GameView>;
}
