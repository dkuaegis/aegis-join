import { create } from "zustand";
import type { PersonalInfoFormValues } from "@/pages/PersonalInfo/PersonalInfo.schema";

interface PersonalInfoState {
  personalInfoData: PersonalInfoFormValues | null;
  setPersonalInfoData: (data: PersonalInfoFormValues) => void;
  isInitial: boolean;
  setNotInitial: () => void;
}

export const usePersonalInfoStore = create<PersonalInfoState>((set) => ({
  personalInfoData: null,
  setPersonalInfoData: (data: PersonalInfoFormValues) =>
    set((state) => ({ ...state, personalInfoData: data })),
  isInitial: true,
  setNotInitial: () => {
    set({ isInitial: false });
  },
}));
