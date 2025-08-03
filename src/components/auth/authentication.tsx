import type React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthStatus } from "@/hooks/useAuth";
import useFunnel from "@/hooks/useFunnel";
import { useAuthStore } from "@/stores/authStore";
import { JOIN_STEPS } from "@/constants/joinSteps";

interface AuthenticationProps {
  children: React.ReactNode;
}

function Authentication({ children }: AuthenticationProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { currentStep } = useFunnel();
  const location = useLocation();

  if (isAuthenticated === AuthStatus.LOADING) {
    return <p> loading </p>;
  }

  if (isAuthenticated === AuthStatus.UNAUTHORIZED) {
    return location.pathname === "/login" ? (
      children
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }

  if (isAuthenticated === AuthStatus.COMPLETED) {
    return location.pathname === "/complete" ? (
      children
    ) : (
      <Navigate to="/complete" replace />
    );
  }

  if (isAuthenticated === AuthStatus.NOT_COMPLETED) {
    const isFunnelPage = JOIN_STEPS.includes(location.pathname.replace("/", ""));
    if(isFunnelPage) {
      return children;
    }
    else {
      const isValidStep = JOIN_STEPS.includes(currentStep);
      const redirectTo = isValidStep ? `/${currentStep}` : JOIN_STEPS[0];
      return <Navigate to={redirectTo} replace />;
    }
  }

  return null;
}

export default Authentication;
