import { Progress } from "@/components/ui/progress";
// import Everytime from "@/pages/Everytime/Everytime";
import LoginPage from "@/pages/LoginPage";
import Payment from "@/pages/Payment/Payment";
import PersonalInfo from "@/pages/PersonalInfo/PersonalInfo";
import Survey from "@/pages/Survey/Survey";
import { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useAuth, { AuthStatus } from "./hooks/useAuth";
import useFunnel from "./hooks/useFunnel";
import Coupon from "./pages/Coupon/Coupon";
import Discord from "./pages/Discord/Discord";
import JoinComplete from "./pages/JoinComplete/JoinComplete";

function App() {
  const { isAuthenticated } = useAuth();
  const { currentStep, progress, next, prev, goto } = useFunnel({
    steps: [
      "PersonalInfo",
      "Survey",
      // "Everytime",
      "Discord",
      "Coupon",
      "Payment",
      "JoinComplete",
    ],
    initialStep: "PersonalInfo",
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.history.pushState(null, "", location.pathname);

    const handlePopState = () => {
      navigate(location.pathname, { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [location, navigate]);

  if (isAuthenticated === AuthStatus.LOADING) {
    return null;
  }

  if (isAuthenticated === AuthStatus.UNAUTHORIZED) {
    return <LoginPage />;
  }

  if (isAuthenticated === AuthStatus.COMPLETED) {
    goto("JoinComplete");
  }

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
        {/* <Route
          path="/Everytime"
          element={
            <Everytime
              onNext={next}
              onPrev={prev}
              onDataSubmit={() => {}} // 핸들러 전달
            />
          }
        /> */}
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
        <Route
          path="/JoinComplete"
          element={<JoinComplete />}
        />

        <Route path="*" element={<Navigate to={`/${currentStep}`} replace />} />
      </Routes>
    </div>
  );
}

export default App;
