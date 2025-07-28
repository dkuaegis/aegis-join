import type React from "react";
import useAuth, { AuthStatus } from "@/hooks/useAuth";
import JoinComplete from "@/pages/JoinComplete/JoinComplete";
import LoginPage from "@/pages/LoginPage";

interface AuthenticationProps {
  children: React.ReactNode;
}

function Authentication({ children }: AuthenticationProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === AuthStatus.LOADING) {
    return null;
  }

  if (isAuthenticated === AuthStatus.UNAUTHORIZED) {
    // return <LoginPage />;
  }

  if (isAuthenticated === AuthStatus.COMPLETED) {
    return <JoinComplete />;
  }

  return <>{children}</>;
}

export default Authentication;
