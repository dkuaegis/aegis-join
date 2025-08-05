import { create } from "zustand";
import { AcquisitionType } from "@/types/api/survey";
import { SurveyFormValues, surveySchema } from "@/pages/Survey/Survey.schema";

interface SurveyState {
  joinReason: string;
  acquisitionType: string | undefined;

  setFormValues: (values: Partial<SurveyFormValues>) => void;
}

export const useSurveyStore = create<SurveyState>((set) => ({
  joinReason: "",
  acquisitionType: undefined,

  setFormValues: (values) => {
        set((state) => ({
      ...state,
      ...values,
    }));
  },
}));
