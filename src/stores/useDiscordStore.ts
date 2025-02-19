import { create } from "zustand";

interface DiscordState {
  isPolling: boolean;
  setIsPolling: (polling: boolean) => void;
}

export const useDiscordStore = create<DiscordState>((set) => ({
  isPolling: true,
  setIsPolling: (polling) => set({ isPolling: polling }),
}));
