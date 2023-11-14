"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import Game from "./Game";
import Modal from "./Modal";
import { useStatus } from "./statusState";
import { useKey } from "./keyState";
import { useTimer } from "../../utils/hooks/useTimer";
import ClearModal from "./ClearModal";

function App() {
  const { getStatus, pause, status } = useStatus();
  const { keys, setKey, removeKey } = useKey();
  const {
    time,
    reset: timerReset,
    start: timerStart,
    stop: timerStop,
  } = useTimer();

  const isPlaying = useMemo(() => status === "playing", [status]);
  const keyIsEscape = useMemo(
    () => keys.length > 0 && keys[0] === "Escape",
    [keys]
  );

  const keyPressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (keyIsEscape) {
      if (getStatus() === "playing") pause();
    }
  }, [keyIsEscape, pause, getStatus]);

  useEffect(() => {
    if (status === "playing") {
      if (keyPressRef.current) keyPressRef.current.focus();
      timerStart();
    } else if (status === "reset") {
      timerReset();
    } else {
      timerStop();
    }
  }, [isPlaying, status, timerReset, timerStart, timerStop]);

  const onKeydown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (getStatus() === "playing") setKey(e.key);
    },
    [getStatus, setKey]
  );

  const onKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (getStatus() === "playing") removeKey(e.key);
    },
    [getStatus, removeKey]
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
      }}
      tabIndex={0}
      onKeyDown={onKeydown}
      onKeyUp={onKeyUp}
      ref={keyPressRef}
    >
      <p
        style={{
          fontSize: "2rem",
          color: "black",
        }}
      >
        Time: {time} s
      </p>
      <Game />
      <Modal />
      <ClearModal time={time} />
    </div>
  );
}

export default App;
