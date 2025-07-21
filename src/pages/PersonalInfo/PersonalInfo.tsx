import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import { usePersonalInfoStore } from "@/stores/usePersonalInfoStore";
import { StudentDepartment } from "./field/studentDepartment";
import { StudentGrade } from "./field/studentGrade";
import { StudentId } from "./field/studentId";
import { StudentPhoneNumber } from "./field/studentPhoneNumber";
import StudentResidentNumber from "./field/studentResidentNumber";
import {
  fetchPersonalInfoData,
  submitPersonalInfoData,
} from "./PersonalInfo.Api";
import {
  type PersonalInfoFormValues,
  personalInfoSchema,
} from "./PersonalInfo.schema";

interface PersonalInfoProps {
  onNext: (data: PersonalInfoFormValues) => void;
  onPrev: () => void;
}

const PersonalInfo = ({ onNext, onPrev }: PersonalInfoProps) => {
  const { personalInfoData, setPersonalInfoData, isInitial, setNotInitial } =
    usePersonalInfoStore();

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
  }, [
    isInitial,
    methods.reset,
    methods.getValues,
    setNotInitial,
    setPersonalInfoData,
  ]);

  const onSubmit = (data: PersonalInfoFormValues) => {
    submitPersonalInfoData(data)
      .then(() => {
        setPersonalInfoData(data);
        onNext(data);
      })
      .catch((error) => {
        console.error("제출 중 오류가 발생했습니다:", error);
      });
  };

  return (
    <FormProvider {...methods}>
      <form
        className="line-breaks space-y-4"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <StudentPhoneNumber name="phoneNumber" />
        <StudentId name="studentId" />
        <StudentDepartment name="department" />
        <StudentGrade name="grade" />
        <StudentResidentNumber />
        <NavigationButtons
          prev={() => {
            setPersonalInfoData(methods.getValues());
            onPrev();
          }}
          next={methods.handleSubmit(onSubmit)}
          isValid={methods.formState.isValid}
          showPrev={true}
        />
      </form>
    </FormProvider>
  );
};

export default PersonalInfo;
