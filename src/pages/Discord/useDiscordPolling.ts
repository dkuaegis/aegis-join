import { useEffect, useRef, useState } from "react";
import { pollDiscordStatus } from "./Discord.Api";

// 1. 'loading' 상태를 타입에 추가합니다.
type DiscordStatus = "loading" | "polling" | "success" | "error";

export const useDiscordPolling = () => {
  // 2. 초기 상태를 'loading'으로 설정합니다.
  const [status, setStatus] = useState<DiscordStatus>("loading");
  // 브라우저 환경에서 setInterval은 number를 반환하므로 number | null 사용
  const intervalRef = useRef<number | null>(null);
  const inFlightRef = useRef(false);
  // 마운트 여부 추적 (언마운트 후 state 변경 방지)
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    // 주기적인 폴링을 위한 함수 (성공 여부를 반환)
    const poll = async (): Promise<boolean> => {
      if (inFlightRef.current) {
        return false;
      }

      inFlightRef.current = true;
      try {
        const result = await pollDiscordStatus();

        if (result.isSuccess) {
          if (isMountedRef.current) {
            setStatus("success");
          }
          // 인터벌 정리 및 표시
          if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return true;
        }
        // 실패(아직 discord 연결 안됨)
        return false;
      } catch (error) {
        console.error("디스코드 폴링 실패:", error);
        if (isMountedRef.current) {
          setStatus("error");
        }
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return false;
      } finally {
        inFlightRef.current = false;
      }
    };

    // 첫 호출은 poll()을 재사용하여 일관성 유지
    const startPolling = async () => {
      try {
        const firstSuccess = await poll();

        if (!firstSuccess) {
          if (isMountedRef.current) {
            setStatus("polling");
          }
          // 5초 간격으로 재시도
          intervalRef.current = window.setInterval(poll, 5000);
        }
      } catch (error) {
        console.error("디스코드 폴링 실패:", error);
        if (isMountedRef.current) {
          setStatus("error");
        }
      }
    };

    startPolling(); // 폴링 프로세스 시작

    // 컴포넌트 언마운트 시 인터벌 정리 및 마운트 플래그 해제
    return () => {
      isMountedRef.current = false;
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []); // 의존성 배열은 비워두어 한 번만 실행되도록 합니다.

  const isValid = status === "success";

  return { isValid, status };
};
