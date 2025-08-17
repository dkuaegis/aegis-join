import { useLocation, useNavigate } from "react-router-dom";
import { JOIN_STEPS } from "@/constants/joinSteps";
import { Analytics } from "@/service/analytics";

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
      // 트래킹: 다음 단계로 이동
      const toStep = steps[nextStepIndex];
      Analytics.trackEvent("Funnel_Step_Advance", {
        category: "Funnel",
        from_step: currentStep,
        to_step: toStep,  
        from_index: currentIndex,
        to_index: nextStepIndex,
        total_steps: steps.length,
      });
      navigate(`/${steps[nextStepIndex]}`);
    }
  };

  const prev = () => {
    const prevStepIndex = currentIndex - 1;
    if (prevStepIndex >= 0) {
      // 트래킹: 이전 단계로 이동
      const toStep = steps[prevStepIndex];
      Analytics.trackEvent("Funnel_Step_Back", {
        category: "Funnel",
        from_step: currentStep,
        to_step: toStep,
        from_index: currentIndex,
        to_index: prevStepIndex,
        total_steps: steps.length,
      });
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
