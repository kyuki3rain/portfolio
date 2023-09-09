"use client";

import { useState } from "react";
import { useHeight } from "../states/height";

type Props = {
  height: number;
};

type State = {
  a: number[];
  b: number[];
  c: number[];
};
type TowerType = keyof State;

const widthClassList = [
  "w-8",
  "w-16",
  "w-24",
  "w-32",
  "w-40",
  "w-48",
  "w-56",
  "w-64",
  "w-72",
  "w-80",
];

function TowerView({ height }: Props) {
  const [state, setState] = useState({
    a: Array.from({ length: height }, (_, i) => height - i - 1),
    b: [] as number[],
    c: [] as number[],
  });
  const [from, setFrom] = useState<TowerType | null>(null);

  const move = (from: TowerType, to: TowerType) => {
    const fromState = state[from];
    const toState = state[to];
    if (fromState.length === 0) return;

    toState.push(fromState.pop()!);
    setState({ ...state, [from]: fromState, [to]: toState });
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
    <div className="flex justify-around w-screen p-10">
      <div
        className="flex flex-col-reverse items-center bg-red-100 flex-1 h-96"
        onClick={() => onClick("a")}
      >
        {state.a.map((i) => (
          <div
            key={`a-${i}`}
            className={`${widthClassList[i]} h-8 bg-gray-500`}
          ></div>
        ))}
      </div>
      <div
        className="flex flex-col-reverse items-center bg-green-100 flex-1 h-96"
        onClick={() => onClick("b")}
      >
        {state.b.map((i) => (
          <div
            key={`b-${i}`}
            className={`${widthClassList[i]} h-8 bg-gray-500`}
          ></div>
        ))}
      </div>
      <div
        className="flex flex-col-reverse items-center bg-blue-100 flex-1 h-96"
        onClick={() => onClick("c")}
      >
        {state.c.map((i) => (
          <div
            key={`c-${i}`}
            className={`${widthClassList[i]} h-8 bg-gray-500`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default function Tower() {
  const { height } = useHeight();

  return <TowerView height={height} key={height}></TowerView>;
}
