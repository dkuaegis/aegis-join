import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import Payment from "@/pages/Payment/Payment";
import PersonalInfo from "@/pages/PersonalInfo/PersonalInfo";
import Survey from "@/pages/Survey/Survey";
import Title from "./components/ui/custom/title";
import useFunnel from "./hooks/useFunnel";
import Agreement from "./pages/Agreement/Agreement";
import Discord from "./pages/Discord/Discord";
import JoinComplete from "./pages/JoinComplete/JoinComplete";
import LoginPage from "./pages/LoginPage";
import Authentication from "./components/auth/authentication";

const FunnelLayout = () => {
  const { currentStep, progress } = useFunnel();

  return (
    <div className="mx-auto mb-8 w-full max-w-md px-4 py-8 pb-28">
      <Title currentStep={currentStep} />
      <Progress value={progress} className="mt-4 mb-8 h-0.5 w-full" />

      <Outlet /> 
    </div>
  );
};

const App = () => {
  return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/complete" element={<JoinComplete />} />
      
        <Route element={<FunnelLayout />}>
          <Route path="/agreement" element={<Agreement />} />
          <Route path="/personal-info" element={<PersonalInfo />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/discord" element={<Discord />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
      </Routes>
  );
};



export default App;
