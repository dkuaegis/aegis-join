import { create } from "zustand";
import type { PersonalInfoFormValues } from "@/components/pages/PersonalInfo/PersonalInfo.schema";

interface PersonalInfoState {
  personalInfoData: PersonalInfoFormValues | null;
  setPersonalInfoData: (data: PersonalInfoFormValues) => void;
  isPersonalInfoSubmitted: boolean;
  setIsPersonalInfoSubmitted: (submitted: boolean) => void;
}

export const usePersonalInfoStore = create<PersonalInfoState>((set) => ({
  personalInfoData: null,
  setPersonalInfoData: (data: PersonalInfoFormValues) => set({ personalInfoData: data }),
  isPersonalInfoSubmitted: false, // 기본값 false로 설정
  setIsPersonalInfoSubmitted: (submitted: boolean) => set({ isPersonalInfoSubmitted: submitted }),
}));
