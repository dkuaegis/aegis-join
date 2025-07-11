import { z } from "zod/v4";
import { AcquisitionType } from "@/types/api/survey";

export const surveySchema = z.object({
  joinReason: z
    .string()
    .min(5, { error: "가입 이유를 작성해주세요!" })
    .max(511, { error: "511자를 초과할 수 없습니다!" }),
  acquisitionType: z.nativeEnum(AcquisitionType, {
    error: "유입 경로를 선택해주세요",
  }),
});

export type SurveyFormValues = z.infer<typeof surveySchema>;
