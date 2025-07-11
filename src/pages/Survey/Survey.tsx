import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import { useSurveyStore } from "@/stores/useSurveyStore";
import { AcquisitionType } from "./Survey.AcquisitionType";
import { fetchSurveyData, submitSurveyData } from "./Survey.Api";
import JoinReason from "./Survey.JoinReason";
import { type SurveyFormValues, surveySchema } from "./Survey.schema";

function Survey({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const {
    joinReason,
    acquisitionType,
    isInitial,
    setFormValues,
    setNotInitial,
  } = useSurveyStore();

  const methods = useForm<SurveyFormValues>({
    resolver: zodResolver(surveySchema),
    mode: "onChange",
    defaultValues: {
      joinReason: joinReason || "",
      acquisitionType: acquisitionType || undefined,
    },
  });

  useEffect(() => {
    if (isInitial) {
      fetchSurveyData()
        .then((data) => {
          // Form 에 받은 데이터를 넣어주고, useForm 의 상태를 초기화 해주고, 받아왔으니 처음이 아닌 상태로.
          setFormValues(data);
          methods.reset(data);
          setNotInitial();
        })
        .catch((error) => {
          console.log("설문조사 정보 가져오는데 오류발생.", error);
        });
    }
    return () => {
      // 언마운트 시에 FormValue 를 업데이트 해줌.
      setFormValues(methods.getValues());
    };
  }, [
    isInitial,
    methods.getValues,
    methods.reset,
    setFormValues,
    setNotInitial,
  ]);

  const onSubmit = (data: SurveyFormValues) => {
    submitSurveyData(data)
      .then(() => {
        setFormValues(data);
        onNext();
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
        <h3 className="font-semibold text-lg">설문조사</h3>

        <Container>
          <AcquisitionType />
        </Container>

        <Container>
          <JoinReason />
        </Container>

        <NavigationButtons
          prev={onPrev}
          next={methods.handleSubmit(onSubmit)}
          isValid={methods.formState.isValid}
        />
      </form>
    </FormProvider>
  );
}

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-2">{children}</div>;
};

export default Survey;
