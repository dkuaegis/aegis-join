import { ArrowLeftIcon } from "lucide-react";
import { Stack } from "@/components/layout/Stack";
import { JOIN_STEP_KOREAN_MAP } from "@/constants/joinSteps";
import { Button } from "../button";

interface TitleProps {
  currentStep: string;
}

const Title = ({ currentStep }: TitleProps) => {
  return (
    <Stack>
      <Button variant="icon" size="icon">
        <ArrowLeftIcon size={16} />
      </Button>
      <h1 className="font-bold text-2xl">
        {JOIN_STEP_KOREAN_MAP[currentStep]}
      </h1>
    </Stack>
  );
};

export default Title;
