import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { JOIN_STEPS } from "@/constants/joinSteps";

const steps = JOIN_STEPS;

const useFunnel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentStep = location.pathname.substring(1);
  const currentIndex = steps.indexOf(currentStep);

  const progress =
    currentIndex > -1 ? (currentIndex / (steps.length - 1)) * 100 : 0;

  const next = () => {
    const nextStepIndex = currentIndex + 1;
    if (nextStepIndex < steps.length) {
      navigate(`/${steps[nextStepIndex]}`);
    }
  };

  const prev = () => {
    const prevStepIndex = currentIndex - 1;
    if (prevStepIndex >= 0) {
      navigate(`/${steps[prevStepIndex]}`);
    }
  };

  const goto = (step: string) => {
    if (steps.includes(step)) {
      navigate(`/${step}`);
    }
  };

  return {
    steps,
    currentStep,
    currentIndex,
    progress,
    next,
    prev,
    goto,
  };
};

export default useFunnel;
