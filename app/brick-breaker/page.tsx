"use client";

import { useCallback, useEffect } from "react";
import Game from "./Game";
import Modal from "./Modal";
import { useStatus } from "./statusState";
import { useKey } from "./keyState";

function App() {
  const { isPlaying, pause, resume, status } = useStatus();
  const { key, setKey } = useKey();

  useEffect(() => {
    if (key === "Escape") {
      if (isPlaying()) pause();
      else resume();
      return;
    }
  }, [key, pause, resume, isPlaying]);

  const onKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!isPlaying()) return;

      setKey(e.key);
    },
    [isPlaying, setKey]
  );

  const onKeyUp = useCallback(() => {
    if (!isPlaying()) return;

    setKey("");
  }, [isPlaying, setKey]);

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
    >
      <Game />
      {status !== "playing" && <Modal />}
    </div>
  );
}

export default App;
