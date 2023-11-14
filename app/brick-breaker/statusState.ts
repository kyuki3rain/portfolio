import { create } from "zustand";

export type StatusType = "pause" | "playing" | "gameover" | "clear" | "reset";

type Store = {
    status: StatusType;
    getStatus: () => StatusType;
    resume: () => void;
    pause: () => void;
    stop: () => void;
    reset: () => void;
    setStatus: (status: StatusType) => void;
}

export const useStatus = create<Store>((set, get) => ({
    status: "pause",
    getStatus: () => get().status,
    resume: () => set({ status: "playing" }),
    pause: () => set({ status: "pause" }),
    stop: () => set({ status: "gameover" }),
    reset: () => set({ status: "reset" }),
    setStatus: (status) => set({ status }),
}));