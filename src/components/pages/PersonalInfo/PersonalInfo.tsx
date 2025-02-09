import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import NavigationButtons from "../../ui/custom/navigationButton";
import {
  type PersonalInfoFormValues,
  personalInfoSchema,
} from "./PersonalInfo.schema";
import { StudentAcademicSemester } from "./field/studentAcademicSemester";
import { StudentAcademicStatus } from "./field/studentAcademicStatus";
import { StudentBirthDate } from "./field/studentBirthDate";
import { StudentDepartment } from "./field/studentDepartment";
import { StudentGender } from "./field/studentGender";
import { StudentGrade } from "./field/studentGrade";
import { StudentId } from "./field/studentId";
import { StudentName } from "./field/studentName";
import { StudentPhoneNumber } from "./field/studentPhoneNumber";

interface PersonalInfoProps {
  onNext: (data: PersonalInfoFormValues) => void;
  onPrev: () => void;
}

function PersonalInfo({ onNext, onPrev }: PersonalInfoProps) {
  const methods = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form className="space-y-4" onSubmit={handleSubmit(onNext)}>
        <h3 className="font-semibold text-lg">기본 인적사항</h3>

        <StudentName name="name" />

        <StudentBirthDate name="birthDate" />

        {/* 성별 라디오 버튼 */}
        <StudentGender name="gender" />

        {/* 학번 필드 */}
        <StudentId name="studentId" />

        {/* 전화번호 필드 */}
        <StudentPhoneNumber name="phoneNumber" />

        {/* 소속 선택 */}
        <StudentDepartment name="department" />

        {/* 학적 상태 선택 */}
        <StudentAcademicStatus name="academicStatus" />

        {/* 학년 선택 */}
        <StudentGrade name="grade" />

        {/* 학기 선택 */}
        <StudentAcademicSemester name="academicSemester" />

        <NavigationButtons
          prev={onPrev}
          next={handleSubmit(onNext)}
          isValid={methods.formState.isValid}
        />
      </form>
    </FormProvider>
  );
}

export default PersonalInfo;
