import { create } from "zustand";

interface AppState {
    isSearching: boolean;
    enterSearch: () => void;
    escapeSearch: () => void;
    toggleSearch: () => void;
    
}

export const useAppStore = create<AppState>((set) => ({
    isSearching: false,
    enterSearch: () => set({isSearching: true}),
    escapeSearch: () => set({isSearching: false}),
    toggleSearch: () => set((previousState) => ({isSearching: !previousState.isSearching}))
}))

