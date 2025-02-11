import { create } from "zustand";
import type { EverytimeValues } from "../components/pages/Everytime/Everytime.Schema";

interface EverytimeState {
  everytimeData: EverytimeValues | null;
  setEverytimeData: (data: EverytimeValues) => void;
  isEverytimeSubmitted: boolean; // Add isSubmitted state
  setIsEverytimeSubmitted: (isSubmitted: boolean) => void; // Add setIsSubmitted action
}

export const useEverytimeStore = create<EverytimeState>((set) => ({
  everytimeData: null,
  setEverytimeData: (data: EverytimeValues) => set({ everytimeData: data }),
  isEverytimeSubmitted: false,
  setIsEverytimeSubmitted: (isSubmitted: boolean) => set({ isEverytimeSubmitted: isSubmitted }),
}));
