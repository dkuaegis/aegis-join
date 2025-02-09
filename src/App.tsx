import Everytime from "@/components/pages/Everytime/Everytime";
import LoginPage from "@/components/pages/LoginPage";
import Payment from "@/components/pages/Payment";
import PersonalInfo from "@/components/pages/PersonalInfo/PersonalInfo";
import Survey from "@/components/pages/Survey/Survey";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Coupon from "./components/pages/Coupon/Coupon";
import Discord from "./components/pages/Discord";
import useFunnel from "./hooks/funnel/useFunnel";
import useAuth from "./hooks/useAuth";
import { type GetPaymentInfo, PaymentStatus } from "./types/api/payment";
import type { EverytimeValues } from "./components/pages/Everytime/Everytime.Schema"; // Import the type

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

  // Everytime 폼 데이터를 저장할 상태
  const [, setEverytimeData] = useState<EverytimeValues | null>(null);

  // Everytime 폼 데이터를 받을 핸들러
  const handleEverytimeData = (data: EverytimeValues) => {
    setEverytimeData(data);
    console.log("App.tsx에서 Everytime 데이터 수신:", data); // 선택적 로깅
    // 이제 여기에서 `data`를 사용하여 애플리케이션 상태를 업데이트하거나 API에 전달할 수 있습니다.
  };

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
              onDataSubmit={handleEverytimeData} // 핸들러 전달
            />
          }
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
    </div>
  );
}

export default App;
