"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import Game from "./Game";
import Modal from "./Modal";
import { useStatus } from "./statusState";
import { useKey } from "./keyState";

function App() {
  const { getStatus, pause, resume, status } = useStatus();
  const { key, setKey } = useKey();
  const isPlaying = useMemo(() => status === "playing", [status]);
  const keyIsEscape = useMemo(() => key === "Escape", [key]);

  const keyPressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (keyIsEscape) {
      if (getStatus() === "playing") pause();
      else resume();
    }
  }, [keyIsEscape, pause, resume, getStatus]);

  useEffect(() => {
    if (isPlaying && keyPressRef.current) keyPressRef.current.focus();
  }, [isPlaying]);

  const onKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (getStatus() === "playing") setKey(e.key);
    },
    [getStatus, setKey]
  );

  const onKeyUp = useCallback(() => {
    if (getStatus() === "playing") setKey("");
  }, [getStatus, setKey]);

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
      ref={keyPressRef}
    >
      <Game />
      {!isPlaying && <Modal />}
    </div>
  );
}

export default App;
