import {create} from 'zustand';
import type { EverytimeValues } from '../components/pages/Everytime/Everytime.Schema';

interface AppState {
  everytimeData: EverytimeValues | null;
  setEverytimeData: (data: EverytimeValues) => void;
}

export const useAppStore = create<AppState>((set) => ({
  everytimeData: null,
  setEverytimeData: (data: EverytimeValues) => set({ everytimeData: data }),
}));