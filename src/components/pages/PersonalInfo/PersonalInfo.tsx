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
import { usePersonalInfoStore } from "@/stores/usePersonalInfoStore";

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
  const { setPersonalInfoData, setIsPersonalInfoSubmitted, isPersonalInfoSubmitted } = usePersonalInfoStore();

  // 폼 제출을 처리
  const onSubmit = (data: PersonalInfoFormValues) => {
    setPersonalInfoData(data);
    console.log("인적사항 제출!", data);
    setIsPersonalInfoSubmitted(true);

    // 다음 단계로 진행
    onNext(data);
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-semibold text-lg">기본 인적사항</h3>

        <StudentName name="name" />

        <StudentBirthDate name="birthDate" />

        <StudentGender name="gender" />

        <StudentId name="studentId" />

        <StudentPhoneNumber name="phoneNumber" />

        <StudentDepartment name="department" />

        <StudentAcademicStatus name="academicStatus" />

        <StudentGrade name="grade" />

        <StudentAcademicSemester name="academicSemester" />

        <NavigationButtons
          prev={onPrev}
          next={handleSubmit(onSubmit)}
          isValid={methods.formState.isValid && isPersonalInfoSubmitted}
        />
      </form>
    </FormProvider>
  );
}

export default PersonalInfo;
