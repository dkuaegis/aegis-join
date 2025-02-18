import type { SurveyFormValues } from "@/pages/Survey/Survey.schema";
import type { InterestField } from "@/types/api/survey";
import { create } from "zustand";

interface SurveyState {
  interests: InterestField[];
  interestsEtc: Partial<Record<InterestField, string | undefined>>;
  joinReason: string;
  feedback: string;

  isInitial: boolean;

  setNotInitial: () => void;
  setFormValues: (values: Partial<SurveyFormValues>) => void;
}

export const useSurveyStore = create<SurveyState>((set) => ({
  interests: [],
  interestsEtc: {},
  joinReason: "",
  feedback: "",

  setFormValues: (values) =>
    set((state) => ({
      ...state,
      ...values,
    })),

  isInitial: true,
  setNotInitial: () => set({ isInitial: false }),
}));
