import { Progress } from "@/components/ui/progress";
import Payment from "@/pages/Payment/Payment";
import PersonalInfo from "@/pages/PersonalInfo/PersonalInfo";
import Survey from "@/pages/Survey/Survey";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useFunnel from "./hooks/useFunnel";
import Coupon from "./pages/Coupon/Coupon";
import Discord from "./pages/Discord/Discord";
import JoinComplete from "./pages/JoinComplete/JoinComplete";

function App() {
  const { currentStep, progress, next, prev } = useFunnel({
    steps: [
      "PersonalInfo",
      "Survey",
      "Discord",
      "Coupon",
      "Payment",
      "JoinComplete",
    ]
  });

  return (
    <div className="mx-auto mb-4 w-full max-w-md px-4 py-8 pb-28">
      <ToastContainer
        position="top-center"
        draggable={true}
        pauseOnFocusLoss={false}
      />
      <h1 className="font-bold text-2xl">동아리 회원 가입</h1>
      <Progress value={progress} className="mt-3 mb-3 w-full" />
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
          path="/Discord"
          element={<Discord onNext={next} onPrev={prev} />}
        />
        <Route
          path="/Coupon"
          element={<Coupon onNext={next} onPrev={prev} />}
        />
        <Route
          path="/Payment"
          element={<Payment onNext={next} onPrev={prev} />}
        />
        <Route path="/JoinComplete" element={<JoinComplete />} />

        <Route path="*" element={<Navigate to={`/${currentStep}`} replace />} />
      </Routes>
    </div>
  );
}

export default App;
