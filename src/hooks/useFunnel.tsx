import { useLocation, useNavigate } from "react-router-dom";

export interface useFunnelProps {
  steps: readonly string[];
}

function useFunnel({ steps }: useFunnelProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentStep = location.pathname.substring(1);
  const currentIndex = steps.indexOf(currentStep);

  if (currentIndex === -1 && currentStep !== "JoinComplete") {
    navigate(`/${steps[0]}`);
  }

  const progress =
    currentStep === "JoinComplete"
      ? 100
      : ((currentIndex + 1) / steps.length) * 100;

  const next = () => {
    const nextStepIndex = currentIndex + 1;
    if (nextStepIndex < steps.length) {
      navigate(`/${steps[nextStepIndex]}`);
    } else {
      navigate("/JoinComplete");
    }
  };

  const prev = () => {
    const prevStepIndex = currentIndex - 1;
    if (prevStepIndex >= 0) {
      navigate(`/${steps[prevStepIndex]}`);
    }
  };

  const goto = (step: string) => {
    if (steps.includes(step) || step === "JoinComplete") {
      navigate(`/${step}`);
    }
  };

  return {
    currentStep,
    currentIndex,
    progress,
    next,
    prev,
    goto,
  };
}

export default useFunnel;
