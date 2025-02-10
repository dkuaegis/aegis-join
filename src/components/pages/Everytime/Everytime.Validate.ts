import { EverytimeSchema, type EverytimeValues } from "./Everytime.Schema";
import { ZodError } from "zod";

interface ValidationResult {
  success: boolean;
  error?: { timetableLink?: { message?: string } };
}

const validateEverytime = (data: EverytimeValues): ValidationResult => {
  try {
    EverytimeSchema.parse(data); // 데이터 검증
    return { success: true }; // 유효성 검사 통과
  } catch (error) {
    // 유효성 검사 실패 시 에러 처리
    if (error instanceof ZodError) {
      const newError: { timetableLink?: { message?: string } } = {};
      for (const err of error.errors) {
        if (err.path[0] === "timetableLink") {
          newError.timetableLink = { message: err.message };
        }
      }
      return { success: false, error: newError };
    }
    // ZodError가 아닌 다른 에러가 발생한 경우 처리
    console.error("유효성 검사 중 예상치 못한 오류 발생:", error);
    return { success: false, error: { timetableLink: { message: "알 수 없는 오류가 발생했습니다." } } };
  }
};

export default validateEverytime;
