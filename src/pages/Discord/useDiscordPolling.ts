import React from "react";
import { pollDiscordStatus } from "./Discord.Api";


export const useDiscordPolling = (
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>
) => {
  React.useEffect(() => {
    let pollingActive = true;
    const interval = 5000;

    const poll = async () => {
      try {
        const result = await pollDiscordStatus();
        if (!pollingActive) return;

        setIsValid(result.isSuccess);

        if (result.isSuccess) {
          pollingActive = false;
        }
      } catch (error) {
        console.error("디스코드 폴링 실패:", error);
      }
    };

    const pollingInterval = setInterval(poll, interval);
    poll();

    return () => {
      pollingActive = false;
      clearInterval(pollingInterval);
    };
  }, [setIsValid]); // 의존성 배열 설정
};