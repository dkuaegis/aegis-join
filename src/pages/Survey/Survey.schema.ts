import { InterestField } from "@/types/api/survey";
import { AcquisitionType } from "@/types/api/survey";
import { z } from "zod";

export function isETC(field: InterestField): boolean {
  return [
    InterestField.SECURITY_ETC,
    InterestField.WEB_ETC,
    InterestField.GAME_ETC,
    InterestField.ETC,
  ].includes(field);
}

export const surveySchema = z
  .object({
    interests: z
      .array(z.nativeEnum(InterestField), {
        invalid_type_error: "올바르지 않은 형식입니다.",
      })
      .nonempty("적어도 하나의 분야를 선택해주세요!"),

    interestsEtc: z.record(z.nativeEnum(InterestField), z.string().optional()),

    joinReason: z
      .string()
      .min(5, "가입 이유를 작성해주세요!")
      .max(511, "511자를 초과할 수 없습니다!"),
    feedback: z.string().max(511, "511자를 초과할 수 없습니다!").optional(),
    acquisitionType: z.nativeEnum(AcquisitionType, {
      errorMap: () => ({ message: "유입 경로를 선택해주세요" }),
    }),
  })
  .superRefine((data, ctx) => {
    for (const field of data.interests) {
      if (isETC(field)) {
        const etcValue = data.interestsEtc[field]?.trim() ?? "";
        if (etcValue === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["interestsEtc", field],
            message: "기타 분야를 작성해주세요",
          });
        }
      }
    }
  });

export type SurveyFormValues = z.infer<typeof surveySchema>;
