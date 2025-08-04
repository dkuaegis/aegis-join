import { create } from "zustand";
import type { SurveyFormValues } from "@/pages/Survey/Survey.schema";
import { AcquisitionType, type InterestField } from "@/types/api/survey";

interface SurveyState {
  interests: InterestField[];
  interestsEtc: Partial<Record<InterestField, string | undefined>>;
  joinReason: string;
  feedback: string;
  acquisitionType: AcquisitionType | undefined;

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
      acquisitionType: Object.values(AcquisitionType).includes(
        values.acquisitionType as AcquisitionType
      )
        ? (values.acquisitionType as AcquisitionType)
        : undefined,
    })),
}));
