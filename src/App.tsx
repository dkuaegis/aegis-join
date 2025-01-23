import Everytime from "@/components/Everytime";
import LoginPage from "@/components/LoginPage";
import Payment from "@/components/Payment";
import PersonalInfo from "@/components/PersonalInfo";
import Survey from "@/components/Survey";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCallback, useEffect, useReducer, useState } from "react";
import Coupon from "./components/Coupon";
import Discord from "./components/Discord";
import { type GetPaymentInfo, PaymentStatus } from "./types/api/payment";
import { PageActions, pageReducer, pageState } from "./lib/pageReducer";
import { startDiscordPolling } from "./lib/api/discordPolling";

function App() {
  const [senderName, setSenderName] = useState<string>("");
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
  const [isOverpaid, setIsOverpaid] = useState<boolean>(false);
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
  

  // init
  const storedPage = localStorage.getItem("currentPage");
  const initialState: pageState = {
    length: 6,
    currentPageIndex: storedPage ? Number(storedPage) : 1,
  }

  const [currentPage, dispatch] = useReducer(pageReducer, initialState);

  useEffect(() => {
    updateLocal("currentPage",currentPage.currentPageIndex);
  }, [currentPage.currentPageIndex]);

  useEffect(() => {
    updateLocal("discordPolling",discordPolling);
    if (discordPolling) {
      startDiscordPolling(setIsDiscordValid);
    }
  }, [discordPolling]);

  useEffect(() => {
    updateLocal("paymentsPolling",paymentsPolling);
    if (paymentsPolling) {
      startPaymentsPolling();
    }
  }, [paymentsPolling]);

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
        if (data.status === "OVERPAID") {
          setIsOverpaid(true);
          setPaymentInfo(data);
          setIsPaymentValid(true);
          return;
        }
        attempts++;
        setPaymentInfo(data);
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
      setSenderName={setSenderName}
    />,
    <Survey
      key="survey"
      onValidate={setIsSurveyValid}
      showErrors={showSurveyValidErrors}
    />,
    <Everytime
      key="everytime"
      onValidate={setIsEverytimeValid}
      isValid={isEverytimeValid}
    />,
    <Discord
      key="discord"
      setPolling={setDiscordPolling}
      isValid={isDiscordValid}
    />,
    <Coupon key="coupon" onValidate={setIsCouponValid} isValid={isCouponValid} />,
    <Payment
      key="payment"
      isValid={isPaymentValid}
      isOverpaid={isOverpaid}
      senderName={senderName}
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

      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const handleNext = () => {
    if (currentPage.currentPageIndex === 1 && !isPersonalInfoValid) {
      setShowPersonalInfoErrors(true);
      return;
    }
    if (currentPage.currentPageIndex === 2 && !isSurveyValid) {
      setShowSurveyValidErrors(true);
      return;
    }
    if (currentPage.currentPageIndex === 3 && !isEverytimeValid) {
      return;
    }
    if (currentPage.currentPageIndex === 4 && !isDiscordValid) {
      return;
    }
    if (currentPage.currentPageIndex === 5 && !isCouponValid) {
      return;
    }
    if (currentPage.currentPageIndex === 6 && !isPaymentValid) {
      return;
    }
    if (currentPage.currentPageIndex < currentPage.length) {
      setShowPersonalInfoErrors(false);
      setShowSurveyValidErrors(false);
      dispatch({type: PageActions.NEXT});
    }
  };

  const handlePrevious = () => {
    if (currentPage.currentPageIndex > 1) {
      setShowPersonalInfoErrors(false);
      setShowSurveyValidErrors(false);
      dispatch({type: PageActions.PREV});
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
          value={(currentPage.currentPageIndex / totalSteps) * 100}
          className="mt-4 w-full"
        />
      </div>
      <div className="mb-6 space-y-6">{components[currentPage.currentPageIndex - 1]}</div>

      <div className="fixed right-0 bottom-0 left-0 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <div className="flex justify-between">
            {currentPage.currentPageIndex > 1 && (
              <Button type="button" onClick={handlePrevious}>
                이전
              </Button>
            )}
            {currentPage.currentPageIndex < currentPage.length && (
              <Button
                type="button"
                variant={
                  (isPersonalInfoValid && currentPage.currentPageIndex === 1) ||
                  (isSurveyValid && currentPage.currentPageIndex === 2) ||
                  (isEverytimeValid && currentPage.currentPageIndex === 3) ||
                  (isDiscordValid && currentPage.currentPageIndex === 4) ||
                  (isCouponValid && currentPage.currentPageIndex === 5) ||
                  (isPaymentValid && currentPage.currentPageIndex === 6)
                    ? "default"
                    : "secondary"
                }
                onClick={handleNext}
                className={currentPage.currentPageIndex === 1 ? "ml-auto" : ""}
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

function updateLocal(name: string, value: any) {
 localStorage.setItem(name, String(value));
}

function getLocal(name: string): string | null {
  return localStorage.getItem(name);
}

export default App;
