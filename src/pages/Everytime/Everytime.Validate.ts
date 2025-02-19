import { ZodError } from "zod";
import { EverytimeSchema, type EverytimeValues } from "./Everytime.Schema";

interface ValidationResult {
  success: boolean;
  error?: { url?: { message?: string } };
}

const validateEverytime = (data: EverytimeValues): ValidationResult => {
  try {
    EverytimeSchema.parse(data);
    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      const newError: { url?: { message?: string } } = {};
      for (const err of error.errors) {
        if (err.path[0] === "url") {
          newError.url = { message: err.message };
        }
      }
      return { success: false, error: newError };
    }
    console.error("유효성 검사 중 예상치 못한 오류 발생:", error);
    return {
      success: false,
      error: { url: { message: "알 수 없는 오류가 발생했습니다." } },
    };
  }
};

export default validateEverytime;
