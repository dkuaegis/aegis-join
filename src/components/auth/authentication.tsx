import React from "react";
import { Navigate } from "react-router-dom";
import useAuth, { AuthStatus } from "@/hooks/useAuth";
import LoginPage from "@/pages/LoginPage";
import JoinComplete from "@/pages/JoinComplete/JoinComplete";

interface AuthenticationProps {
  children: React.ReactNode;
}

function Authentication({ children } : AuthenticationProps) {
    const { isAuthenticated } = useAuth();


  if (isAuthenticated === AuthStatus.LOADING) {
    return null;
  }

  if (isAuthenticated === AuthStatus.UNAUTHORIZED) {
    return <LoginPage />;
  }
  
  if (isAuthenticated === AuthStatus.COMPLETED) {
    return <JoinComplete />;
  }

  return <>{children}</>;
}

export default Authentication;