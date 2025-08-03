import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import useFunnel from "@/hooks/useFunnel";
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
  PersonalInfoApiValues,
  type PersonalInfoFormValues,
  personalInfoSchema,
} from "./PersonalInfo.schema";
import { useNextStep } from "@/hooks/useNextStep";
import { transformFetchedDataToFormValues } from "./PersonalInfo.helper";



const PersonalInfo = () => {
  const { personalInfoData, setPersonalInfoData } = usePersonalInfoStore();
  const isInitial = personalInfoData === null;
  const [isFetching, setIsFetching] = useState(isInitial);

  const handleSubmitWithTransform = async (formData: PersonalInfoFormValues) => {
      // 주민등록번호로 성별 계산
      const gender = Number(formData.residentNumber_back) % 2 ? "MALE" : "FEMALE";
      
      // API에 보낼 데이터 가공
      const { residentNumber_back, ...rest } = formData;
      const apiData: PersonalInfoApiValues = { ...rest, gender };

      // 실제 API 호출 함수 실행
      return submitPersonalInfoData(apiData);
  };

  const { isLoading, handleSubmit } = useNextStep(handleSubmitWithTransform);

  const defaultValues = personalInfoData || {};

  const methods = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    if (isInitial) {
      fetchPersonalInfoData()
        .then((data) => {
          const transformedData = transformFetchedDataToFormValues(data);
          setPersonalInfoData(transformedData);
          methods.reset(transformedData);
        })
        .catch(console.error)
        .finally(() => setIsFetching(false));
    }

    return () => {
      if (methods.formState.isDirty) {
        setPersonalInfoData(methods.getValues());
      }
    };
  }, [
    methods.reset,
    methods.getValues,
    setPersonalInfoData,
  ]);

  return (
    <FormProvider {...methods}>
      <form
        className="line-breaks space-y-4"
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <StudentPhoneNumber name="phoneNumber" />
        <StudentId name="studentId" />
        <StudentDepartment name="department" />
        <StudentGrade name="grade" />
        <StudentResidentNumber />
        <NavigationButtons 
          disabled={!methods.formState.isValid} 
          isLoading={isLoading} 
        />
      </form>
    </FormProvider>
  );
};

export default PersonalInfo;

