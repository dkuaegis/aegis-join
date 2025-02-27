import {
  AcademicStatus,
  Department,
  Gender,
  Grade,
  Semester,
} from "@/types/api/member";
import { z } from "zod";

// 생년월일 유효성 검사 함수 (YYMMDD 형식, 월/일 범위만 체크)
const isValidBirthDate = (birthDate: string): boolean => {
  if (!/^\d{6}$/.test(birthDate)) {
    return false; // 형식이 YYMMDD가 아니면 false
  }

  const month = Number.parseInt(birthDate.substring(2, 4));
  const day = Number.parseInt(birthDate.substring(4, 6));

  if (month < 1 || month > 12) {
    return false; // 월이 1~12 범위를 벗어나면 false
  }

  if (day < 1 || day > 31) {
    return false; // 일이 1~31 범위를 벗어나면 false
  }

  return true; // 유효한 YYMMDD 형식이고 월/일이 범위 내에 있으면 true
};

export const personalInfoSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  birthDate: z
    .string()
    .length(6, "생년월일을 6자리로 입력해주세요 (YYMMDD)")
    .refine(
      isValidBirthDate,
      "유효하지 않은 생년월일입니다 (월/일 범위: 1~12, 1~31)"
    ),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: "성별을 선택해주세요" }),
  }),
  studentId: z
    .string()
    .length(8, "학번은 8자리여야 합니다")
    .refine(
      (val) => /^32\d{6}$/.test(val),
      "학번은 32로 시작하는 8자리 숫자여야 합니다"
    ),
  phoneNumber: z
    .string()
    .min(1, "전화번호를 입력해주세요")
    .refine((val) => {
      const phoneRegex = /^(01[016789])-?[0-9]{3,4}-?[0-9]{4}$/;
      return phoneRegex.test(val);
    }, "전화번호 형식이 올바르지 않습니다"),
  department: z.nativeEnum(Department, {
    errorMap: () => ({ message: "학과를 선택해주세요" }),
  }),
  // reRegistration: z
  //   .boolean()
  //   .refine((val) => val !== null, {
  //     message: "재등록 여부를 선택해주세요",
  //   }),
  academicStatus: z.nativeEnum(AcademicStatus, {
    errorMap: () => ({ message: "학적 상태를 선택해주세요" }),
  }),
  grade: z.nativeEnum(Grade, {
    errorMap: () => ({ message: "학년을 선택해주세요" }),
  }),
  semester: z.nativeEnum(Semester, {
    errorMap: () => ({ message: "학기를 선택해주세요" }),
  }),
});

export type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;
