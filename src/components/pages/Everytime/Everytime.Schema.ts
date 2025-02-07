import { z } from "zod";

// zod 스키마 정의
export const EverytimeSchema = z.object({
  timetableLink: z.string().url({ message: "올바른 URL 형식이 아닙니다." }),
});

// zod 스키마 타입 정의
export type EverytimeValues = z.infer<typeof EverytimeSchema>;
