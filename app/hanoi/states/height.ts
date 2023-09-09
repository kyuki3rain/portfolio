import { create } from "zustand";

type Store = {
    height: number;
    setHeight: (height: number) => void;
}

export const useHeight = create<Store>((set) => ({
    height: 3,
    setHeight: (height) => set({ height }),
}));