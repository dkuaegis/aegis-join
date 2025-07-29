import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import useFunnel from "@/hooks/useFunnel";
import { useSurveyStore } from "@/stores/useSurveyStore";
import { AcquisitionType } from "./Survey.AcquisitionType";
import { submitSurveyData } from "./Survey.Api";
import JoinReason from "./Survey.JoinReason";
import { type SurveyFormValues, surveySchema } from "./Survey.schema";

const Survey = () => {
  const { next } = useFunnel();
  const { joinReason, acquisitionType, setFormValues } = useSurveyStore();

  const methods = useForm<SurveyFormValues>({
    resolver: zodResolver(surveySchema),
    mode: "onChange",
    defaultValues: {
      joinReason: joinReason || "",
      acquisitionType: acquisitionType || undefined,
    },
  });

  useEffect(() => {
    return () => {
      // 언마운트 시에 FormValue 를 업데이트 해줌.
      setFormValues(methods.getValues());
    };
  }, [methods.getValues, setFormValues]);

  const onSubmit = (data: SurveyFormValues) => {
    submitSurveyData(data)
      .then(() => {
        setFormValues(data);
        next();
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
        <Container>
          <AcquisitionType />
        </Container>

        <Container>
          <JoinReason />
        </Container>

        <NavigationButtons isValid={methods.formState.isValid} />
      </form>
    </FormProvider>
  );
};

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-2">{children}</div>;
};

export default Survey;
