import { create } from "zustand";
import { shallow } from "zustand/shallow";
import type { EverytimeValues } from "../pages/Everytime/Everytime.Schema";

interface EverytimeState {
  everytimeData: EverytimeValues | null;
  setEverytimeData: (data: EverytimeValues) => void;
  isInitial: boolean;
  setNotInitial: () => void;
}

export const useEverytimeStore = create<EverytimeState>((set) => ({
  everytimeData: null,
  setEverytimeData: (data: EverytimeValues) =>
    set((state) => {
      // shallow 비교를 사용하여 변경된 경우에만 상태를 업데이트합니다.
      if (!shallow(state.everytimeData, data)) {
        return { everytimeData: data };
      }
      return state;
    }),
  isInitial: true,
  setNotInitial: () => set({ isInitial: false }),
}));
