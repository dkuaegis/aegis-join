import { create } from "zustand";
import { httpClient } from "@/api/api";
import type { ServerError } from "@/api/types";

export enum AuthStatus {
  UNAUTHORIZED = "UNAUTHORIZED",
  NOT_COMPLETED = "NOT_COMPLETED",
  COMPLETED = "COMPLETED",
  LOADING = "LOADING",
}

// 스토어의 상태와 액션들의 타입을 정의합니다.
interface AuthState {
  isAuthenticated: AuthStatus;
  checkAuth: () => Promise<void>;
  completeRegistration: () => void;
  logout: () => void;
}

interface AuthResponse {
  status: "PENDING" | "COMPLETED";
}

export const useAuthStore = create<AuthState>((set) => ({
  // 초기 상태
  isAuthenticated: AuthStatus.LOADING,

  // 비동기 액션: 앱 시작 시 최초 인증 확인
  checkAuth: async () => {
    try {
      const data = await httpClient.get<AuthResponse>("/auth/check");
      if (data.status === "PENDING") {
        set({ isAuthenticated: AuthStatus.NOT_COMPLETED });
      }
      if (data.status === "COMPLETED") {
        set({ isAuthenticated: AuthStatus.COMPLETED });
      }
    } catch (error) {
      // 401 에러 또는 네트워크 에러 발생 시 인증 실패 상태로 변경
      const serverError = error as ServerError;
      if (serverError.status === 401) {
        set({ isAuthenticated: AuthStatus.UNAUTHORIZED });
      } else {
        // 그 외 서버 에러나 네트워크 문제도 인증 실패로 처리
        console.error("Auth check failed:", error);
        set({ isAuthenticated: AuthStatus.UNAUTHORIZED });
      }
    }
  },

  completeRegistration: () => {
    set({ isAuthenticated: AuthStatus.COMPLETED });
  },

  logout: () => {
    set({ isAuthenticated: AuthStatus.UNAUTHORIZED });
  },
}));

useAuthStore.getState().checkAuth();
