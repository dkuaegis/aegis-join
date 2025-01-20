import Everytime from "@/components/Everytime";
import LoginPage from "@/components/LoginPage";
import Payment from "@/components/Payment";
import PersonalInfo from "@/components/PersonalInfo";
import Survey from "@/components/Survey";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCallback, useEffect, useState } from "react";
import Coupon from "./components/Coupon";
import Discord from "./components/Discord";
import { type GetPaymentInfo, PaymentStatus } from "./types/api/payment";

//join progress 는 그 컴포넌트에서 get 요청을 날릴 때만 갱신된다.

const joinProgressOrder = [
  "GOOGLE_LOGIN", //구글 로그인을 한 상태. 이 상태가 아니라면 401을 보낸다. Auth 가 안됐다는 뜻.
  "PERSONAL_INFORMATION",
  "SURVEY",
  "EVERYTIME",
  "DISCORD",
  "COUPON",
  "PAYMENT",
  "COMPLETE",
] as const;

type JoinProgress = (typeof joinProgressOrder)[number];

function progressToStep(progress: JoinProgress): number {
  const index = joinProgressOrder.indexOf(progress);
  if (index === -1) {
    throw new Error(`Invalid progress value${progress}`);
  }
  if (progress === "GOOGLE_LOGIN") {
    //처음에 오면 GOOGLE_LOGIN 이라서, PERSONAL_INFORMATION 인 것과 같은 페이지를 보여줘야함.
    return index + 1;
  }
  return index;
}

interface GetAuthCheck {
  student_name_id: string; //이름이랑 학번 합쳐서 줌
  joinProgress: JoinProgress; // 진행상황 가져옴.
}

function App() {
  
  const [studentNameID, setStudentNameID] = useState<string>("");
  const [paymentInfo, setPaymentInfo] = useState<GetPaymentInfo>({
    status: PaymentStatus.PENDING,
    expectedDepositAmount: 10000,
    currentDepositAmount: 10000,
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isPersonalInfoValid, setIsPersonalInfoValid] = useState<boolean>(true);
  const [isSurveyValid, setIsSurveyValid] = useState<boolean>(true);
  const [isEverytimeValid, setIsEverytimeValid] = useState<boolean>(false);
  const [isDiscordValid, setIsDiscordValid] = useState<boolean>(false);
  const [isCouponValid, setIsCouponValid] = useState<boolean>(false);
  const [isPaymentValid, setIsPaymentValid] = useState<boolean>(false);
  const [showPersonalInfoErrors, setShowPersonalInfoErrors] =
    useState<boolean>(false);
  const [showSurveyValidErrors, setShowSurveyValidErrors] =
    useState<boolean>(false);

  // 폴링 상태를 로컬 스토리지에서 가져옴.
  const [discordPolling, setDiscordPolling] = useState<boolean>(() => {
    const storedValue = localStorage.getItem("discordPolling");
    return storedValue === "true";
  });
  const [paymentsPolling, setPaymentsPolling] = useState<boolean>(() => {
    const storedValue = localStorage.getItem("paymentsPolling");
    return storedValue === "true";
  });
  const [currentStep, setCurrentStep] = useState<number>(() => {
    const storedValue = localStorage.getItem("currentStep");
    return storedValue ? Number(storedValue) : 1;
  });

  useEffect(() => {
    localStorage.setItem("currentStep", String(currentStep));
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem("discordPolling", String(discordPolling));
    if (discordPolling) {
      startDiscordPolling();
    }
  }, [discordPolling]);

  useEffect(() => {
    localStorage.setItem("paymentsPolling", String(paymentsPolling));
    if (paymentsPolling) {
      startPaymentsPolling();
    }
  }, [paymentsPolling]);

  const startDiscordPolling = useCallback(() => {
    let attempts = 0;
    const interval = 2000;

    const poll = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/discord/check`
        );
        if (!response.ok) {
          throw new Error("HTTP ERROR");
        }
        const data = await response.json();

        if (data.status === "COMPLETE") {
          setIsDiscordValid(true);
          return;
        }
        attempts++;
        setTimeout(poll, interval); //재귀
      } catch (err: unknown) {
        setIsDiscordValid(false);
      }
    };

    poll();
  }, []);

  const startPaymentsPolling = useCallback(() => {
    let attempts = 0;
    const interval = 2000;

    const poll = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/payments/status`
        );
        if (!response.ok) {
          throw new Error("HTTP ERROR");
        }
        const data: GetPaymentInfo = await response.json();

        if (data.status === "COMPLETE") {
          setPaymentInfo(data);
          setIsPaymentValid(true);
          return;
        }
        attempts++;
        setTimeout(poll, interval); //재귀
      } catch (err: unknown) {
        setIsPaymentValid(false);
      }
    };

    poll();
  }, []);

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
    <Everytime key="everytime" onValidate={setIsEverytimeValid} />,
    <Discord
      key="discord"
      setPolling={setDiscordPolling}
      isValid={isDiscordValid}
    />,
    <Coupon key="coupon" onValidate={setIsCouponValid} />,
    <Payment
      key="payment"
      isValid={isPaymentValid}
      senderNameID={studentNameID}
      startPolling={setPaymentsPolling}
      payInfo={paymentInfo}
    />,
  ];
  const totalSteps = components.length;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/check`
          // {
          //    credentials: "include",
          // }
        );
        if (!response.ok) {
          throw new Error("인증 정보 없음.");
        }

        setIsAuthenticated(response.status === 200);
        const data: GetAuthCheck = await response.json();
        setCurrentStep(progressToStep(data.joinProgress));
        setStudentNameID(data.student_name_id);
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
    if (currentStep === 3 && !isEverytimeValid) {
      return;
    }
    if (currentStep === 4 && !isDiscordValid) {
      return;
    }
    if (currentStep === 5 && !isCouponValid) {
      return;
    }
    if (currentStep === 6 && !isPaymentValid) {
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
    <div className="mx-auto mb-4 w-full max-w-md px-4 py-8">
      <div className="mb-6">
        <h1 className="font-bold text-2xl">동아리 회원 가입</h1>
        <Progress
          value={(currentStep / totalSteps) * 100}
          className="mt-4 w-full"
        />
      </div>
      <div className="mb-6 space-y-6">{components[currentStep - 1]}</div>

      <div className="fixed right-0 bottom-0 left-0 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <div className="flex justify-between">
            {currentStep > 1 && (
              <Button type="button" onClick={handlePrevious}>
                이전
              </Button>
            )}
            {currentStep < totalSteps && (
              <Button
                type="button"
                variant={
                  (isPersonalInfoValid && currentStep === 1) ||
                  (isSurveyValid && currentStep === 2) ||
                  (isEverytimeValid && currentStep === 3) ||
                  (isDiscordValid && currentStep === 4) ||
                  (isCouponValid && currentStep === 5) ||
                  (isPaymentValid && currentStep === 6)
                    ? "default"
                    : "secondary"
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
