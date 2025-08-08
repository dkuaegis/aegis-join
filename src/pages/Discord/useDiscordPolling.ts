import { useEffect, useRef, useState } from "react";
import { pollDiscordStatus } from "./Discord.Api";

type DiscordStatus = "polling" | "success" | "error";

export const useDiscordPolling = () => {
  const [status, setStatus] = useState<DiscordStatus>("polling");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inFlightRef = useRef(false);

  useEffect(() => {
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

    poll();
    intervalRef.current = setInterval(poll, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // 기존 컴포넌트 호환성을 위해 isValid 값을 status로부터 계산해서 함께 반환합니다.
  const isValid = status === "success";

  return { isValid, status };
};
