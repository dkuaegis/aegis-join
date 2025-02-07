import { Label } from "@/components/ui/label";

import { CodeXml, Ellipsis, Gamepad2, GlobeLock } from "lucide-react";
import NavigationButtons from "../../ui/custom/navigationButton";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import FeedBack from "./Survey.FeedBack";
import { InterestFieldGroup } from "./Survey.FieldGroup";
import {
  interestsEtc,
  interestsGame,
  interestsSecurity,
  interestsWeb,
} from "./Survey.Items";
import JoinReason from "./Survey.JoinReason";
import { type SurveyFormValues, surveySchema } from "./Survey.schema";

function Survey({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  console.log(onNext, onPrev);

  const methods = useForm<SurveyFormValues>({
    resolver: zodResolver(surveySchema),
    mode: "onChange",
    defaultValues: {
      interestFields: [],
      interestEtc: {},
      joinReason: "",
      feedBack: "",
    },
  });

  console.log(methods.getValues());

  const onSubmit = (data: SurveyFormValues) => {
    //validation logic
    console.log("submit!", data);
    onNext();
  };

  return (
    <FormProvider {...methods}>
      <form className="space-y-4" onSubmit={methods.handleSubmit(onNext)}>
        <h3 className="font-semibold text-lg">설문조사</h3>

        <Container>
          <Label>관심분야 (다중 선택 가능)</Label>
          <InterestFieldGroup
            name="보안"
            interestField={interestsSecurity}
            Icon={GlobeLock}
          />
          <InterestFieldGroup
            name="웹"
            interestField={interestsWeb}
            Icon={CodeXml}
          />
          <InterestFieldGroup
            name="게임"
            interestField={interestsGame}
            Icon={Gamepad2}
          />
          <InterestFieldGroup
            name="기타"
            interestField={interestsEtc}
            Icon={Ellipsis}
          />
        </Container>
        <EtcErrorMessage
          error={methods.formState.errors.interestFields?.message}
        />

        <Container>
          <JoinReason />
        </Container>

        <Container>
          <FeedBack />
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

const EtcErrorMessage = ({ error }: { error?: string }) => {
  if (!error) return null;
  return <p className="text-red-500 text-xs duration-200 ">{error}</p>;
};

export default Survey;
