import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import useFunnel from "@/hooks/useFunnel";
import { useSurveyStore } from "@/stores/useSurveyStore";
import JoinReason from "./Survey.JoinReason";
import { type SurveyFormValues, surveySchema } from "./Survey.schema";
import { httpClient } from "@/api/api";
import { useNextStep } from "@/hooks/useNextStep";
import { AcquisitionType } from "./Survey.AcquisitionType";

const submitSurveyData =  async (data: SurveyFormValues) => {
    return httpClient.post('/survey', data);
}

const Survey = () => {
  const { joinReason, acquisitionType, setFormValues } = useSurveyStore();
  const { isLoading, handleSubmit } = useNextStep(submitSurveyData);

  const defaultValues = {
    joinReason: joinReason || "",
    acquisitionType: acquisitionType || undefined,
  };  

  const isInitiallyValid = surveySchema.safeParse(defaultValues).success;

  const methods = useForm<SurveyFormValues>({
    resolver: zodResolver(surveySchema),
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    return () => {
      setFormValues(methods.getValues());
    };
  }, [methods, setFormValues]);

  return (
    <FormProvider {...methods}>
      <form
        className="line-breaks space-y-4"
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <AcquisitionType />
        <JoinReason />

        <NavigationButtons 
          disabled={!methods.formState.isValid} 
          isLoading={isLoading}
        />
      </form>
    </FormProvider>
  );
};

export default Survey;
