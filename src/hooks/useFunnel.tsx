import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface useFunnelProps {
  steps: readonly string[];
}

const useFunnel = ({ steps }: useFunnelProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentStep = location.pathname.substring(1);
  const currentIndex = steps.indexOf(currentStep);

  useEffect(() => {
    if (currentIndex === -1) {
      navigate(`/${steps[0]}`, { replace: true });
    }
  }, [currentIndex, navigate, steps]);

  const progress =
    currentIndex > -1 ? ((currentIndex + 1) / steps.length) * 100 : 0;

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
