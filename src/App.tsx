import Everytime from "@/components/pages/Everytime";
import LoginPage from "@/components/pages/LoginPage";
import Payment from "@/components/pages/Payment";
import PersonalInfo from "@/components/pages/PersonalInfo";
import Survey from "@/components/pages/Survey";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useCallback, useEffect, useReducer, useState } from "react";
import Coupon from "./components/pages/Coupon";
import Discord from "./components/pages/Discord";
import { startDiscordPolling } from "./lib/api/discordPolling";
import {
  checkPageValidation,
  useValidation,
} from "./lib/context/validationContext";
import {
  PageActions,
  pageReducer,
  type pageState,
} from "./lib/reducer/pageReducer";
import { ValidationActions } from "./lib/reducer/validationReducer";
import { type GetPaymentInfo, PaymentStatus } from "./types/api/payment";
import { ValidState } from "./types/state/valid";

function App() {
  const [senderName, setSenderName] = useState<string>("");
  const [paymentInfo, setPaymentInfo] = useState<GetPaymentInfo>({
    status: PaymentStatus.PENDING,
    expectedDepositAmount: 10000,
    currentDepositAmount: 10000,
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isPaymentValid, setIsPaymentValid] = useState<boolean>(false);
  const [isOverpaid, setIsOverpaid] = useState<boolean>(false);

  const { validationState, validationDispatch } = useValidation();

  const surveyShowError = () =>
    validationDispatch({ type: ValidationActions.SHOW_ERROR, field: "survey" });
  const personalInfoShowError = () =>
    validationDispatch({
      type: ValidationActions.SHOW_ERROR,
      field: "personalInfo",
    });

  // 폴링 상태를 로컬 스토리지에서 가져옴.
  const [discordPolling, setDiscordPolling] = useState<boolean>(() => {
    const storedValue = getLocal("discordPolling");
    return storedValue === "true";
  });
  const [paymentsPolling, setPaymentsPolling] = useState<boolean>(() => {
    const storedValue = getLocal("paymentsPolling");
    return storedValue === "true";
  });

  // init
  const storedPage = getLocal("currentPage");
  const initialState: pageState = {
    length: 6,
    currentPageIndex: storedPage ? Number(storedPage) : 1,
  };

  const [currentPage, dispatch] = useReducer(pageReducer, initialState);

  useEffect(() => {
    updateLocal<number>("currentPage", currentPage.currentPageIndex);
  }, [currentPage.currentPageIndex]);

  useEffect(() => {
    updateLocal<boolean>("discordPolling", discordPolling);
    if (discordPolling) {
      startDiscordPolling(validationDispatch);
    }
  }, [discordPolling, validationDispatch]);

  useEffect(() => {
    updateLocal<boolean>("paymentsPolling", paymentsPolling);
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

  const discordValid = validationState.discord === ValidState.VALID;

  const components = [
    <PersonalInfo key="personal-info" setSenderName={setSenderName} />,
    <Survey key="survey" />,
    <Everytime key="everytime" />,
    <Discord
      key="discord"
      setPolling={setDiscordPolling}
      isValid={discordValid}
    />,
    <Coupon key="coupon" />,
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
          `${import.meta.env.VITE_API_URL}/auth/check`,
          {
            credentials: "include",
          }
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
    if (
      currentPage.currentPageIndex === 1 &&
      validationState.personalInfo !== ValidState.VALID
    ) {
      personalInfoShowError();
      return;
    }
    if (
      currentPage.currentPageIndex === 2 &&
      validationState.survey !== ValidState.VALID
    ) {
      surveyShowError();
      return;
    }
    if (
      currentPage.currentPageIndex >= 3 &&
      !checkPageValidation(validationState, currentPage.currentPageIndex)
    ) {
      return;
    }
    dispatch({ type: PageActions.NEXT });
  };

  const handlePrevious = () => {
    dispatch({ type: PageActions.PREV });
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
      <div className="mb-6 space-y-6">
        {components[currentPage.currentPageIndex - 1]}
      </div>

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
                  checkPageValidation(
                    validationState,
                    currentPage.currentPageIndex
                  )
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

function updateLocal<T>(name: string, value: T) {
  localStorage.setItem(name, String(value));
}

function getLocal(name: string): string | null {
  return localStorage.getItem(name);
}

export default App;
