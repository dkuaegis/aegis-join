import { useCallback, useEffect, useState } from "react";
import { httpClient } from "@/api/api";

export enum AuthStatus {
  UNAUTHORIZED = "UNAUTHORIZED", // 인증 안됨 (401)
  NOT_COMPLETED = "NOT_COMPLETED", // 가입 완료 안됨
  COMPLETED = "COMPLETED", // 가입 완료
  LOADING = "LOADING",
}

const useAuth = () => {
  const [isAuthenticated, setAuthenticated] = useState<AuthStatus>(
    AuthStatus.LOADING
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await httpClient.get("/auth/check");
        setAuthenticated(AuthStatus.NOT_COMPLETED);


      } catch (error: unknown) {
        setAuthenticated(AuthStatus.UNAUTHORIZED);
      }
    };

    checkAuth();
  }, []);

  const completeRegistration = useCallback(() => {
    setAuthenticated(AuthStatus.COMPLETED);
    console.log('hi' + isAuthenticated)
  }, []);  

  return { isAuthenticated, completeRegistration };
};

export default useAuth;
