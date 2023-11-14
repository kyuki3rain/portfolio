import { useState, useEffect, useCallback, useMemo } from "react";

export function useTimer() {
  const [time, setTime] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (enabled === false) return;

    const timer = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [enabled]);

  const timeString = useMemo(() => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [time]);

  const reset = useCallback(() => {
    setTime(0);
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => !prev);
  }, []);

  const start = useCallback(() => {
    setEnabled(true);
  }, []);

  const stop = useCallback(() => {
    setEnabled(false);
  }, []);

  return { time, enabled, timeString, reset, toggle, start, stop };
}
