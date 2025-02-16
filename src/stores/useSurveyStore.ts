import type { SurveyFormValues } from "@/pages/Survey/Survey.schema";
import type { InterestField } from "@/types/api/survey";
import { create } from "zustand";

interface SurveyState {
  interestFields: InterestField[];
  interestEtc: Partial<Record<InterestField, string | undefined>>;
  joinReason: string;
  feedBack: string;

  isInitial: boolean;

  setNotInitial: () => void;
  setFormValues: (values: Partial<SurveyFormValues>) => void;
}

export const useSurveyStore = create<SurveyState>((set) => ({
  interestFields: [],
  interestEtc: {},
  joinReason: "",
  feedBack: "",

  setFormValues: (values) =>
    set((state) => ({
      ...state,
      ...values,
    })),

  isInitial: true,
  setNotInitial: () => set({ isInitial: false }),
}));
