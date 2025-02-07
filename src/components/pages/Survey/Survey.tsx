import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { CodeXml, Ellipsis, Gamepad2, GlobeLock } from "lucide-react";
import NavigationButtons from "../../ui/custom/navigationButton";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { SurveyFormValues, surveySchema } from "./Survey.schema";
import { interestsEtc, interestsGame, interestsSecurity, interestsWeb } from "./Survey.Items";
import { InterestFieldGroup } from "./Survey.FieldGroup";



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

  console.log(methods.getValues())

  const onSubmit = (data: SurveyFormValues) => {
    //validation logic
    console.log("submit!" , data)
    onNext();
  }

  return (
    <FormProvider {...methods}>
    <form className="space-y-4" onSubmit={methods.handleSubmit(onNext)}>
      <h3 className="font-semibold text-lg">설문조사</h3>

      <div className="space-y-2">
        <Label>관심분야 (다중 선택 가능)</Label>
        <InterestFieldGroup name="보안" interestField={interestsSecurity} Icon={GlobeLock}/>
        <InterestFieldGroup name="웹" interestField={interestsWeb} Icon={CodeXml}/>
        <InterestFieldGroup name="게임" interestField={interestsGame} Icon={Gamepad2}/>
        <InterestFieldGroup name="기타" interestField={interestsEtc} Icon={Ellipsis}/>
      </div>
      {methods.formState.errors.interestFields && (<p 
      className="text-red-500 text-xs">
      {methods.formState.errors.interestFields.message}
      </p>)
      }

      <div className="space-y-2">
        <Label htmlFor="joinReason" className="flex items-end text-xl">
          가입 이유{" "}
          <span
            className={`pb-1 pl-2 text-red-500 text-xs 
              ${methods.formState.errors.joinReason ? "visibility-visible opacity-100" : "visibility-hidden opacity-0"}`}
          >
            *필수 항목입니다
          </span>
        </Label>
        <Textarea
          id="joinReason"
          placeholder="동아리에서 어떤 활동을 하고 싶으신가요?"
          maxLength={511}
          {...methods.register("joinReason")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="messageToManagement" className="text-xl">
          운영진에게 하고 싶은 말
        </Label>

        <Textarea
          id="messageToManagement"
          placeholder="예시로 작년과는 이런 점이 달라졌으면 좋겠어요!"
          maxLength={511}
          {...methods.register("feedBack")}
        />
      </div>
      <NavigationButtons prev={onPrev} next={methods.handleSubmit(onSubmit)} isValid={methods.formState.isValid} />
    </form>
    </FormProvider>
  );
}

export default Survey;
