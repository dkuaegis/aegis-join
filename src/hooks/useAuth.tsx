import { useEffect, useState } from "react";

export enum AuthStatus {
  UNAUTHORIZED = "UNAUTHORIZED", // 인증 안됨 (401)
  NOT_COMPLETED = "NOT_COMPLETED", // 가입 완료 안됨
  COMPLETED = "COMPLETED", // 가입 완료
  LOADING = "LOADING",
}

export default function useAuth() {
  const [isAuthenticated, setAuthenticated] = useState<AuthStatus>(
    AuthStatus.LOADING
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/check`,
          {
            credentials: "include",
          }
        );

        if (response.status === 401) {
          setAuthenticated(AuthStatus.UNAUTHORIZED);
          return;
        }
        if (!response.ok) {
          throw new Error("알 수 없는 에러 발생.");
        }
        const data = await response.json();
        if (data.status === "COMPLETED" || data.status === "OVERPAID") {
          setAuthenticated(AuthStatus.COMPLETED);
        } else {
          setAuthenticated(AuthStatus.NOT_COMPLETED);
        }
      } catch (error) {
        console.log("Auth check error:", error);
        setAuthenticated(AuthStatus.UNAUTHORIZED);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated };
}
