import { useEffect, useRef, useState } from "react";
import { pollDiscordStatus } from "./Discord.Api";

// 1. 'loading' 상태를 타입에 추가합니다.
type DiscordStatus = "loading" | "polling" | "success" | "error";

export const useDiscordPolling = () => {
  // 2. 초기 상태를 'loading'으로 설정합니다.
  const [status, setStatus] = useState<DiscordStatus>("loading");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inFlightRef = useRef(false);

  useEffect(() => {
    // 주기적인 폴링을 위한 함수
    const poll = async () => {
      if (inFlightRef.current) {
        return;
      }

      inFlightRef.current = true;
      try {
        const result = await pollDiscordStatus();

        if (result.isSuccess) {
          setStatus("success");
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }
        // isSuccess가 false인 경우, 다음 interval에서 다시 시도하므로 상태 변경 없음
      } catch (error) {
        console.error("디스코드 폴링 실패:", error);
        setStatus("error");
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      } finally {
        inFlightRef.current = false;
      }
    };

    // 3. 폴링을 시작하는 비동기 함수를 만듭니다.
    const startPolling = async () => {
      try {
        // 첫 번째 API 호출을 시작합니다. 이 동안 status는 'loading' 입니다.
        const result = await pollDiscordStatus();

        if (result.isSuccess) {
          setStatus("success");
        } else {
          // 4. 첫 시도가 성공이 아니면, 상태를 'polling'으로 바꾸고 인터벌을 시작합니다.
          setStatus("polling");
          intervalRef.current = setInterval(poll, 5000);
        }
      } catch (error) {
        console.error("디스코드 폴링 실패:", error);
        setStatus("error");
      }
    };

    startPolling(); // 폴링 프로세스 시작

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // 의존성 배열은 비워두어 한 번만 실행되도록 합니다.

  const isValid = status === "success";

  return { isValid, status };
};
