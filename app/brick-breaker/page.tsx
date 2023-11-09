"use client";

import { useCallback, useEffect, useState } from "react";

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

function App() {
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });
  const [ballVelocity, setBallVelocity] = useState({ x: 1, y: 1 });
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [controller, setController] = useState({ x: 42, y: 90 });
  const [keyPress, setKeyPress] = useState("");
  const [status, setStatus] = useState<
    "pause" | "playing" | "gameover" | "clear"
  >("pause");

  useEffect(() => {
    return setBlocks(
      new Array(8).fill(0).flatMap((_, i) =>
        new Array(8).fill(0).map((_, j) => ({
          x: i * 10 + 11,
          y: j * 5 + 5,
          width: 8,
          height: 3,
          color: colors[(i * 8 + j) % colors.length],
        }))
      )
    );
  }, []);

  useEffect(() => {
    if (status !== "playing") return;

    const interval = setInterval(() => {
      setBallPosition((ballPosition) => ({
        x: ballPosition.x + ballVelocity.x,
        y: ballPosition.y + ballVelocity.y,
      }));
    }, 30);
    return () => clearInterval(interval);
  }, [ballVelocity, status]);

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
  }, [ballPosition]);

  useEffect(() => {
    if (keyPress === "Escape") {
      if (status === "playing") setStatus("pause");
      else if (status === "pause") setStatus("playing");
    }

    if (status === "pause") return;
    if (keyPress === "ArrowRight") {
      const interval = setInterval(() => {
        setController((controller) => ({
          x: controller.x + 1,
          y: controller.y,
        }));
      }, 10);
      return () => clearInterval(interval);
    }
    if (keyPress === "ArrowLeft") {
      const interval = setInterval(() => {
        setController((controller) => ({
          x: controller.x - 1,
          y: controller.y,
        }));
      }, 10);
      return () => clearInterval(interval);
    }
  }, [keyPress]);

  const onKeydown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    setKeyPress(e.key);
  }, []);

  const onKeyUp = useCallback(() => {
    setKeyPress("");
  }, []);

  const onClick = useCallback(() => {
    if (status !== "pause") return;
    setStatus("playing");
  }, [status]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
      }}
      tabIndex={0}
      onKeyDown={onKeydown}
      onKeyUp={onKeyUp}
      onClick={onClick}
    >
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
    </div>
  );
}

export default App;
