import { create } from "zustand";

export type StatusType = "pause" | "playing" | "clear" | "reset";

type Store = {
    status: StatusType;
    getStatus: () => StatusType;
    resume: () => void;
    pause: () => void;
    reset: () => void;
    clear: () => void;
    setStatus: (status: StatusType) => void;
}

export const useStatus = create<Store>((set, get) => ({
    status: "pause",
    getStatus: () => get().status,
    resume: () => set({ status: "playing" }),
    pause: () => set({ status: "pause" }),
    reset: () => set({ status: "reset" }),
    clear: () => set({ status: "clear" }),
    setStatus: (status) => set({ status }),
}));