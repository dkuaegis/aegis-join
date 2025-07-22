import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Progress } from "@/components/ui/progress";
import Payment from "@/pages/Payment/Payment";
import PersonalInfo from "@/pages/PersonalInfo/PersonalInfo";
import Survey from "@/pages/Survey/Survey";
import Title from "./components/ui/custom/title";
import { JOIN_STEPS } from "./constants/joinSteps";
import useFunnel from "./hooks/useFunnel";
import Agreement from "./pages/Agreement/Agreement";
import Coupon from "./pages/Coupon/Coupon";
import Discord from "./pages/Discord/Discord";
import JoinComplete from "./pages/JoinComplete/JoinComplete";

const App = () => {
  const { currentStep, progress, next, prev } = useFunnel({
    steps: JOIN_STEPS,
  });

  return (
    <div className="mx-auto mb-8 w-full max-w-md px-4 py-8 pb-28">
      <ToastContainer
        position="top-center"
        draggable={true}
        pauseOnFocusLoss={false}
      />

      <Title currentStep={currentStep} onPrev={prev} />
      <Progress value={progress} className="mt-4 mb-8 h-0.5 w-full" />

      <Routes>
        <Route path="/agreement" element={<Agreement />} />
        <Route
          path="/personal-info"
          element={<PersonalInfo onNext={next} onPrev={prev} />}
        />
        <Route
          path="/survey"
          element={<Survey onNext={next} onPrev={prev} />}
        />
        <Route
          path="/discord"
          element={<Discord onNext={next} onPrev={prev} />}
        />
        <Route
          path="/coupon"
          element={<Coupon onNext={next} onPrev={prev} />}
        />
        <Route
          path="/payment"
          element={<Payment onNext={next} onPrev={prev} />}
        />
        <Route path="/complete" element={<JoinComplete />} />

        <Route path="*" element={<Navigate to={`/${currentStep}`} replace />} />
      </Routes>
    </div>
  );
};

export default App;
