import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export interface UseFunnelConfig {
  steps: string[];
  initialStep: string;
}

function useFunnel({ steps, initialStep }: UseFunnelConfig) {
  const navigate = useNavigate();
  const location = useLocation();

  const stepFromUrl = location.pathname.replace("/", "") || initialStep;

  const currentStep = useMemo(() => {
    return steps.includes(stepFromUrl) ? stepFromUrl : initialStep;
  }, [stepFromUrl, steps, initialStep]);

  const currentIndex = useMemo(() => {
    return steps.indexOf(currentStep);
  }, [currentStep, steps]);

  const progress = useMemo(() => {
    return ((currentIndex + 1) / steps.length) * 100;
  }, [currentIndex, steps.length]);

  useEffect(() => {
    if (!steps.includes(stepFromUrl)) {
      navigate(`/${initialStep}`, { replace: true });
    }
  }, [stepFromUrl, steps, initialStep, navigate]);

  const next = () => {
    if (currentIndex < steps.length - 1) {
      navigate(`/${steps[currentIndex + 1]}`);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      navigate(`/${steps[currentIndex - 1]}`);
    }
  };

  const goto = (step: string) => {
    if (steps.includes(step)) {
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
