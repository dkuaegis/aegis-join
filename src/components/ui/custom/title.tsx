import { ArrowLeftIcon } from "lucide-react";
import { Stack } from "@/components/layout/Stack";
import { JOIN_STEP_KOREAN_MAP } from "@/constants/joinSteps";
import { Button } from "../button";

interface TitleProps {
  currentStep: string;
  onPrev?: () => void;
}

const Title = ({ currentStep, onPrev }: TitleProps) => {

  const stepKeys = Object.keys(JOIN_STEP_KOREAN_MAP);
  const isFirstStep = currentStep === stepKeys[0];
  const isLastStep = currentStep === stepKeys[stepKeys.length - 1];

  if (isFirstStep || isLastStep) {
    return (
      <div className="flex h-full items-center justify-center">
        <h1 className="text-2xl font-bold">
          {JOIN_STEP_KOREAN_MAP[currentStep]}
        </h1>
      </div>   
    )
  } else {
  return (
    <Stack>
      <Button  variant="icon" aria-label="Go back" onClick={onPrev}>
        <ArrowLeftIcon size={32}/>
      </Button>
      <h1 className="font-bold text-2xl">
        {JOIN_STEP_KOREAN_MAP[currentStep]}
      </h1>
    </Stack>
  );
  }
};

export default Title;
