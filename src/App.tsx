import Everytime from "@/components/pages/Everytime";
import LoginPage from "@/components/pages/LoginPage";
import Payment from "@/components/pages/Payment";
import PersonalInfo from "@/components/pages/PersonalInfo";
import Survey from "@/components/pages/Survey";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Coupon from "./components/pages/Coupon";
import Discord from "./components/pages/Discord";
import useFunnel from "./lib/funnel/useFunnel";
import { type GetPaymentInfo, PaymentStatus } from "./types/api/payment";

function App() {
  const [, setSenderName] = useState<string>("");
  const [paymentInfo] = useState<GetPaymentInfo>({
    status: PaymentStatus.PENDING,
    expectedDepositAmount: 10000,
    currentDepositAmount: 10000,
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const { currentStep, progress, next, prev } = useFunnel({
    steps: [
      "PersonalInfo",
      "Survey",
      "Everytime",
      "Discord",
      "Coupon",
      "Payment",
    ],
    initialStep: "PersonalInfo",
  });

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

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="mx-auto mb-4 w-full max-w-md px-4 py-8 pb-20">
      <h1 className="font-bold text-2xl">동아리 회원 가입</h1>
      <Progress value={progress} className="mt-4 w-full" />
      <Routes>
        <Route
          path="/PersonalInfo"
          element={
            <PersonalInfo
              setSenderName={setSenderName}
              onNext={next}
              onPrev={prev}
            />
          }
        />
        <Route
          path="/Survey"
          element={<Survey onNext={next} onPrev={prev} />}
        />
        <Route
          path="/Everytime"
          element={<Everytime onNext={next} onPrev={prev} />}
        />
        <Route
          path="/Discord"
          element={<Discord isValid={true} onNext={next} onPrev={prev} />}
        />
        <Route
          path="/Coupon"
          element={<Coupon onNext={next} onPrev={prev} />}
        />
        <Route
          path="/Payment"
          element={
            <Payment
              onNext={next}
              onPrev={prev}
              isValid={true}
              isOverpaid={true}
              payInfo={paymentInfo}
              senderName="hi"
            />
          }
        />

        <Route path="*" element={<Navigate to={`/${currentStep}`} replace />} />
      </Routes>

      <div className="fixed right-0 bottom-0 left-0 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <div className="flex justify-between">
            <Button type="button" onClick={prev}>
              이전
            </Button>
            <Button type="button" onClick={next}>
              다음
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
