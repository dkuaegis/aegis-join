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
import { useEffect } from "react";
import { fetchPersonalInfoData, submitPersonalInfoData } from "./PersonalInfo.Api";

interface PersonalInfoProps {
  onNext: (data: PersonalInfoFormValues) => void;
  onPrev: () => void;
}

function PersonalInfo({ onNext, onPrev }: PersonalInfoProps) {
  const {
    personalInfoData,
    setPersonalInfoData,
    isInitial,
    setNotInitial,
  } = usePersonalInfoStore();

  const methods = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
    defaultValues: personalInfoData || {},
  });

  useEffect(() => {
    if (isInitial) {
      fetchPersonalInfoData()
        .then((data: PersonalInfoFormValues) => {
          setPersonalInfoData(data);
          methods.reset(data);
          setNotInitial();
        })
        .catch(console.error);
    }

    return () => {
      setPersonalInfoData(methods.getValues());
    };
  }, [isInitial, methods, setNotInitial, setPersonalInfoData]);

  const onSubmit = (data: PersonalInfoFormValues) => {
    submitPersonalInfoData(data)
    .then(() => {
      setPersonalInfoData(data);
      onNext(data);
    })
    .catch((error) => {
      console.error('제출 중 오류가 발생했습니다:', error);
      // TODO: 사용자에게 에러 메시지 표시
    });
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-4" onSubmit={methods.handleSubmit(onSubmit)}>
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
          prev={() => {
            setPersonalInfoData(methods.getValues());
            onPrev();
          }}
          next={methods.handleSubmit(onSubmit)}
          isValid={methods.formState.isValid}
        />
      </form>
    </FormProvider>
  );
}

export default PersonalInfo;