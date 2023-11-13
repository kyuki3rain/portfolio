import { create } from "zustand";

type Store = {
    key: string;
    setKey: (key: string) => void;
}

export const useKey = create<Store>((set) => ({
    key: "",
    setKey: (key) => set({ key }),
}));