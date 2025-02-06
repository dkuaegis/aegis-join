import { AcademicStatus, Department, Gender, Grade, Semester } from "@/types/api/member";
import { formatPhoneNumber } from "@/utils/PersonalInfo.helper";
import { StudentName } from "./field/studentName";
import { StudentBirthDate } from "./field/studentBirthDate";
import { StudentGender } from "./field/studentGender";
import { StudentId } from "./field/studentId";
import { StudentPhoneNumber } from "./field/studentPhoneNumber";
import { StudentDepartment } from "./field/studentDepartment";
import { StudentAcademicStatus } from "./field/studentAcademicStatus";
import { StudentGrade } from "./field/studentGrade";
import { StudentAcademicSemester } from "./field/studentAcademicSemester";
import NavigationButtons from "../ui/custom/navigationButton";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const personalInfoSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요"),
  birthDate: z.string().length(6, "생년월일을 입력해주세요"),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: "성별을 선택해주세요" }),
  }),
  studentId: z.string().min(1, "학번을 입력해주세요"),
  phoneNumber: z
    .string()
    .min(1, "전화번호를 입력해주세요")
    .refine((val) => {
      // 하이픈(-) 제거 후 숫자만 남은 값의 길이 검사 (10~11자리)
      const normalized = val.replace(/-/g, "");
      const phoneRegex = /^[0-9]{10,11}$/;
      return phoneRegex.test(normalized);
    }, "전화번호 형식이 올바르지 않습니다"),
  department: z.nativeEnum(Department, {
    errorMap: () => ({ message: "학과를 선택해주세요"}),
  }),
  academicStatus: z.nativeEnum(AcademicStatus, {
    errorMap: () => ({ message: "학적 상태를 선택해주세요"}),
  }),
  grade: z.nativeEnum(Grade, {
    errorMap: () => ({ message: "학년을 선택해주세요"}),
  }),
  academicSemester: z.nativeEnum(Semester, {
    errorMap: () => ({ message: "학기를 선택해주세요"}),
  }),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

function PersonalInfo({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {

  const { register, handleSubmit, formState: {errors, isValid} , watch} = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
  })


  console.log(onNext, onPrev);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onNext)}>
      
      <h3 className="font-semibold text-lg">기본 인적사항</h3>

      <StudentName
        {...register("name")}
        error={errors.name?.message}
      />

      <StudentBirthDate
        {...register("birthDate")}
        error={errors.birthDate?.message}
      />

      {/* 성별 라디오 버튼 */}
      <StudentGender 
        {...register("gender")} 
        error={errors.gender?.message} 
      />

      {/* 학번 필드 */}
      <StudentId 
        error={errors.studentId}
        // showErrors={showErrors}
      />

      {/* 전화번호 필드 */}
      <StudentPhoneNumber
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        formatPhoneNumber={formatPhoneNumber}
        phoneNumberError={phoneNumberError}
        errors={errors.phoneNumber}
        // showErrors={showErrors}
      />

      {/* 소속 선택 */}
      <StudentDepartment
        department={department}
        setDepartment={setDepartment}
        errors={errors.department}
        // showErrors={showErrors}
      />

      {/* 학적 상태 선택 */}
      <StudentAcademicStatus
        academicStatus={academicStatus}
        setAcademicStatus={setAcademicStatus}
        errors={errors.academicStatus}
        // showErrors={showErrors}
      />

      {/* 학년 선택 */}
      <StudentGrade
        grade={grade}
        setGrade={setGrade}
        errors={errors.grade}
        // showErrors={showErrors}
      />

      {/* 학기 선택 */}
      <StudentAcademicSemester
        academicSemester={academicSemester}
        setAcademicSemester={setAcademicSemester}
        errors={errors.academicSemester}
        // showErrors={showErrors}
      />

      <NavigationButtons prev={onPrev} next={onNext} isValid={isValid} />
    </form>
  );
}

export default PersonalInfo;

 
