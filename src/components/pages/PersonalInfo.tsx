import { AcademicStatus, Department, Gender, Grade, Semester } from "@/types/api/member";
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, FormProvider } from "react-hook-form";

const personalInfoSchema = z.object({
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
  onNext: (data: PersonalInfoFormValues) => void;
  onPrev: () => void;
}) {

  const methods = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState: {errors}, control } = methods;

  return (
    <FormProvider {...methods}>
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
        <Controller
            name="gender"
            control={control}
            render={({ field }) => (
                <StudentGender
                    {...field}
                    error={errors.gender?.message}
                />
            )}
        />

        {/* 학번 필드 */}
        <StudentId
            {...register("studentId")}
            error={errors.studentId?.message}
        />

        {/* 전화번호 필드 */}
        <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <StudentPhoneNumber
                {...field}
                error={errors.phoneNumber?.message}
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />

        {/* 소속 선택 */}
          <Controller
              name="department"
              control={control}
              render={({ field }) => (
                  <StudentDepartment
                      {...field}
                      error={errors.department?.message}
                  />
              )}
          />

        {/* 학적 상태 선택 */}
        <Controller
            name="academicStatus"
            control={control}
            render={({ field }) => (
                <StudentAcademicStatus
                    {...field}
                    error={errors.academicStatus?.message}
                />
            )}
        />

        {/* 학년 선택 */}
        <Controller
            name="grade"
            control={control}
            render={({ field }) => (
                <StudentGrade
                    {...field}
                    error={errors.grade?.message}
                />
            )}
        />

        {/* 학기 선택 */}
        <Controller
            name="academicSemester"
            control={control}
            render={({ field }) => (
                <StudentAcademicSemester
                    {...field}
                    error={errors.academicSemester?.message}
                />
            )}
        />

        <NavigationButtons prev={onPrev} next={handleSubmit(onNext)} isValid={true} />
      </form>
    </FormProvider>
  );
}

export default PersonalInfo;
