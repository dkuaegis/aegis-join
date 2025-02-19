import {
  AcademicStatus,
  Department,
  Gender,
  Grade,
  Semester,
} from "@/types/api/member";
import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  birthDate: z.string().length(6, "생년월일을 입력해주세요"),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: "성별을 선택해주세요" }),
  }),
  studentId: z.string().length(8, "학번을 입력해주세요"),
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
