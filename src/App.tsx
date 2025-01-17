import Everytime from "@/components/Everytime";
import LoginPage from "@/components/LoginPage";
import PersonalInfo from "@/components/PersonalInfo";
import Survey from "@/components/Survey";
import Discord from "./components/Discord";
import Payment from "@/components/Payment";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import Coupon from "./components/Coupon";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isPersonalInfoValid, setIsPersonalInfoValid] = useState(true);
  const [isSurveyValid, setIsSurveyValid] = useState(true);
  const [showPersonalInfoErrors, setShowPersonalInfoErrors] = useState(false);
  const [showSurveyValidErrors, setShowSurveyValidErrors] = useState(false);
  const components = [
    <PersonalInfo
      key="personal-info"
      onValidate={setIsPersonalInfoValid}
      showErrors={showPersonalInfoErrors}
    />,
    <Survey
      key="survey"
      onValidate={setIsSurveyValid}
      showErrors={showSurveyValidErrors}
    />,
    <Everytime key="everytime" />,
    <Discord key="discord" />,
    <Coupon key="coupon" />,
    <Payment key="payment" />,
  ];
  const totalSteps = components.length;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/check`,
          {
            credentials: "include",
          }
        );
        setIsAuthenticated(response.status === 200);
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleNext = () => {
    if (currentStep === 1 && !isPersonalInfoValid) {
      setShowPersonalInfoErrors(true);
      return;
    }
    if (currentStep === 2 && !isSurveyValid) {
      setShowSurveyValidErrors(true);
      return;
    }
    if (currentStep < totalSteps) {
      setShowPersonalInfoErrors(false);
      setShowSurveyValidErrors(false);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setShowPersonalInfoErrors(false);
      setShowSurveyValidErrors(false);
      setCurrentStep(currentStep - 1);
    }
  };

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-8 mb-4">
      <div className="mb-6">
        <h1 className="font-bold text-2xl">동아리 회원 가입</h1>
        <Progress
          value={(currentStep / totalSteps) * 100}
          className="mt-4 w-full"
        />
      </div>
      <div className="mb-6 space-y-6">{components[currentStep - 1]}</div>

      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm">
  <div className="mx-auto w-full max-w-md px-4 py-4">
    <div className="flex justify-between">
        {currentStep > 1 && (
          <Button 
          type="button" 
          onClick={handlePrevious}
          >
            이전
          </Button>
        )}
        {currentStep < totalSteps && (
          <Button
            type="button"
            variant={
              (!isPersonalInfoValid && currentStep === 1) ||
              (!isSurveyValid && currentStep === 2)
                ? "secondary"
                : "default"
            }
            onClick={handleNext}
            className={currentStep === 1 ? "ml-auto" : ""}
          >
            다음
          </Button>
        )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
