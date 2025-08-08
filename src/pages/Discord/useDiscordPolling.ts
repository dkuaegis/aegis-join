import { useEffect, useRef, useState } from "react";
import { pollDiscordStatus } from "./Discord.Api";

export const useDiscordPolling = () => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const poll = async () => {
      try {
        const result = await pollDiscordStatus();

        if (result.isSuccess) {
          setIsValid(true);
          // 성공
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }
        // false 인 경우
      } catch (error) {
        console.error("디스코드 폴링 실패:", error);

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

  return { isValid };
};