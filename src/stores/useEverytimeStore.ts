import { create } from "zustand";
import type { EverytimeValues } from "../components/pages/Everytime/Everytime.Schema";

interface EverytimeState {
  everytimeData: EverytimeValues | null;
  setEverytimeData: (data: EverytimeValues) => void;
  isInitial: boolean;
  setNotInitial: () => void;
}

export const useEverytimeStore = create<EverytimeState>((set) => ({
  everytimeData: null,
  setEverytimeData: (data: EverytimeValues) => set({ everytimeData: data }),
  isInitial: true,
  setNotInitial: () => set({ isInitial: false }),
}));
