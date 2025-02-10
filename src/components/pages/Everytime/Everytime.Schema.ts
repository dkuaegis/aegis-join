import { LoadingState } from "@/types/state/loading";
import { z } from "zod";

export const EverytimeSchema = z.object({
  timetableLink: z
    .string()
    .refine((value) => value.startsWith("https://everytime.kr/@"), {
      message:
        "에브리타임 시간표 링크는 'https://everytime.kr/@' 로 시작해야 합니다.",
    }),
  loading: z.nativeEnum(LoadingState).default(LoadingState.IDLE),
});

// 타입 정의
export type EverytimeValues = z.infer<typeof EverytimeSchema>;
export { LoadingState };
