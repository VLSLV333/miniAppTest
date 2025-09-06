import {create} from "zustand";

interface UIState {
    activeTaskId: string | null;
    openTask: (id: string) => void;
    closeTask: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    activeTaskId: null,
    openTask: (id: string) => set({activeTaskId: id}),
    closeTask: () => set({activeTaskId: null}),
}));

