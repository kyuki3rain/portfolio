import { create } from "zustand";

type Store = {
    keys: string[];
    setKey: (key: string) => void;
    removeKey: (key: string) => void;
}

export const useKey = create<Store>((set) => ({
    keys: [],
    setKey: (key) => set((state) => ({ keys: [...state.keys, key] })),
    removeKey: (key) => set((state) => ({ keys: state.keys.filter((k) => k !== key) })),
}));