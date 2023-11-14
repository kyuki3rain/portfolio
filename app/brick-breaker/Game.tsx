"use client";

import { useEffect, useMemo, useState } from "react";
import { useStatus } from "./statusState";
import { useKey } from "./keyState";

const BALL_RADIUS = 1;
const AREA_SIZE = {
  width: 100,
  height: 100,
};
const CONTROLLER_SIZE = {
  width: 12,
  height: 2,
};

type Block = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
};

const colors = [
  "#FF0000",
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#0000FF",
  "#4B0082",
  "#8F00FF",
];

const genBlocks = () => {
  return new Array(8).fill(0).flatMap((_, i) =>
    new Array(8).fill(0).map((_, j) => ({
      x: i * 10 + 11,
      y: j * 5 + 5,
      width: 8,
      height: 3,
      color: colors[(i * 8 + j) % colors.length],
    }))
  );
};

function Game() {
  const { status, resume } = useStatus();
  const { key } = useKey();
  const reset = useMemo(() => status === "reset", [status]);
  const playing = useMemo(() => status === "playing", [status]);

  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });
  const [ballVelocity, setBallVelocity] = useState({ x: 1, y: 1 });
  const [blocks, setBlocks] = useState<Block[]>(genBlocks());
  const [controller, setController] = useState({ x: 42, y: 90 });

  useEffect(() => {
    console.log(reset);
    if (!reset) return;

    setBallPosition({ x: 50, y: 50 });
    setBallVelocity({ x: 1, y: 1 });
    setBlocks(genBlocks());
    setController({ x: 42, y: 90 });

    resume();
  }, [resume, reset]);

  useEffect(() => {
    if (!playing) return;

    const interval = setInterval(() => {
      setBallPosition((ballPosition) => ({
        x: ballPosition.x + ballVelocity.x,
        y: ballPosition.y + ballVelocity.y,
      }));
    }, 30);
    return () => clearInterval(interval);
  }, [ballVelocity, playing]);

  useEffect(() => {
    if (
      ballPosition.x < BALL_RADIUS ||
      ballPosition.x > AREA_SIZE.width - BALL_RADIUS
    ) {
      setBallVelocity((ballVelocity) => ({
        x: -ballVelocity.x,
        y: ballVelocity.y,
      }));
    }
    if (
      ballPosition.y < BALL_RADIUS ||
      ballPosition.y > AREA_SIZE.height - BALL_RADIUS
    ) {
      setBallVelocity((ballVelocity) => ({
        x: ballVelocity.x,
        y: -ballVelocity.y,
      }));
    }
  }, [ballPosition]);

  useEffect(() => {
    setBlocks((blocks) =>
      blocks.filter((block) => {
        if (
          block.x - BALL_RADIUS < ballPosition.x &&
          ballPosition.x < block.x + block.width + BALL_RADIUS &&
          block.y - BALL_RADIUS < ballPosition.y &&
          ballPosition.y < block.y + block.height + BALL_RADIUS
        ) {
          setBallVelocity((bv) => {
            const beforePosition = {
              x: ballPosition.x - bv.x,
              y: ballPosition.y - bv.y,
            };
            if (
              beforePosition.x < block.x ||
              beforePosition.x > block.x + block.width
            ) {
              return {
                x: -bv.x,
                y: bv.y,
              };
            }
            if (
              beforePosition.y < block.y ||
              beforePosition.y > block.y + block.height
            ) {
              return {
                x: bv.x,
                y: -bv.y,
              };
            }
            return bv;
          });
          return false;
        }
        return true;
      })
    );
  }, [ballPosition]);

  useEffect(() => {
    if (
      controller.x - BALL_RADIUS < ballPosition.x &&
      ballPosition.x < controller.x + CONTROLLER_SIZE.width + BALL_RADIUS &&
      controller.y - BALL_RADIUS < ballPosition.y &&
      ballPosition.y < controller.y + CONTROLLER_SIZE.height + BALL_RADIUS
    ) {
      setBallVelocity((bv) => {
        const beforePosition = {
          x: ballPosition.x - bv.x,
          y: ballPosition.y - bv.y,
        };
        if (
          beforePosition.x < controller.x ||
          beforePosition.x > controller.x + CONTROLLER_SIZE.width
        ) {
          return {
            x: -bv.x,
            y: bv.y,
          };
        }
        if (
          beforePosition.y < controller.y ||
          beforePosition.y > controller.y + CONTROLLER_SIZE.height
        ) {
          return {
            x: bv.x,
            y: -bv.y,
          };
        }
        return bv;
      });
    }
  }, [ballPosition, controller]);

  useEffect(() => {
    if (key === "ArrowRight") {
      const interval = setInterval(() => {
        setController((controller) => ({
          x: controller.x + 1,
          y: controller.y,
        }));
      }, 10);
      return () => clearInterval(interval);
    }
    if (key === "ArrowLeft") {
      const interval = setInterval(() => {
        setController((controller) => ({
          x: controller.x - 1,
          y: controller.y,
        }));
      }, 10);
      return () => clearInterval(interval);
    }
  }, [key]);

  return (
    <svg
      width="50vh"
      height="50vh"
      viewBox={`0 0 ${AREA_SIZE.width} ${AREA_SIZE.height}`}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <rect
        x="0"
        y="0"
        width={AREA_SIZE.width}
        height={AREA_SIZE.height}
        fill="black"
      />
      <circle
        cx={ballPosition.x}
        cy={ballPosition.y}
        r={BALL_RADIUS}
        stroke="white"
        fill="white"
      />
      {blocks.map((block) => (
        <rect
          key={`${block.x}-${block.y}`}
          x={block.x}
          y={block.y}
          width={block.width}
          height={block.height}
          fill={block.color}
        />
      ))}
      <rect
        x={controller.x}
        y={controller.y}
        width={CONTROLLER_SIZE.width}
        height={CONTROLLER_SIZE.height}
        fill="white"
      />
    </svg>
  );
}

export default Game;
