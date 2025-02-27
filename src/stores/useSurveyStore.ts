import type { SurveyFormValues } from "@/pages/Survey/Survey.schema";
import type { AcquisitionType, InterestField } from "@/types/api/survey";
import { create } from "zustand";

interface SurveyState {
  interests: InterestField[];
  interestsEtc: Partial<Record<InterestField, string | undefined>>;
  joinReason: string;
  feedback: string;
  acquisitionType: AcquisitionType | undefined;
  isInitial: boolean;

  setNotInitial: () => void;
  setFormValues: (values: Partial<SurveyFormValues>) => void;
}

export const useSurveyStore = create<SurveyState>((set) => ({
  interests: [],
  interestsEtc: {},
  joinReason: "",
  feedback: "",
  acquisitionType: undefined,

  setFormValues: (values) =>
    set((state) => ({
      ...state,
      ...values,
      acquisitionType: values.acquisitionType as AcquisitionType | undefined,
    })),

  isInitial: true,
  setNotInitial: () => set({ isInitial: false }),
}));
