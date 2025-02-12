import Everytime from "@/components/pages/Everytime/Everytime";
import LoginPage from "@/components/pages/LoginPage";
import Payment from "@/components/pages/Payment";
import PersonalInfo from "@/components/pages/PersonalInfo/PersonalInfo";
import Survey from "@/components/pages/Survey/Survey";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Coupon from "./components/pages/Coupon/Coupon";
import Discord from "./components/pages/Discord/Discord";
import useAuth from "./hooks/useAuth";
import useFunnel from "./hooks/useFunnel";
import { type GetPaymentInfo, PaymentStatus } from "./types/api/payment";

function App() {
  const [paymentInfo] = useState<GetPaymentInfo>({
    status: PaymentStatus.PENDING,
    expectedDepositAmount: 10000,
    currentDepositAmount: 10000,
  });

  const { isAuthenticated } = useAuth();

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

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="mx-auto mb-4 w-full max-w-md px-4 py-8 pb-28">
      <h1 className="font-bold text-2xl">동아리 회원 가입</h1>
      <Progress value={progress} className="mt-4 w-full" />
      <Routes>
        <Route
          path="/PersonalInfo"
          element={<PersonalInfo onNext={next} onPrev={prev} />}
        />
        <Route
          path="/Survey"
          element={<Survey onNext={next} onPrev={prev} />}
        />
        <Route
          path="/Everytime"
          element={
            <Everytime
              onNext={next}
              onPrev={prev}
              onDataSubmit={() => {}} // 핸들러 전달
            />
          }
        />
        <Route
          path="/Discord"
          element={<Discord onNext={next} onPrev={prev} />}
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
    </div>
  );
}

export default App;
