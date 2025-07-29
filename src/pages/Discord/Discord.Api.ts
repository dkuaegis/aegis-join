export const fetchDiscordCode = async (): Promise<string> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/discord/issue-verification-code`,
      {
        credentials: "include",
        method: "POST",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP ERROR! status: ${response.status}`);
    }
    const data = await response.json();
    return data.code;
  } catch (err: unknown) {
    console.error("디스코드 인증코드 에러:", err);
    throw err;
  }
};

interface DiscordResponse {
  discordId: string | null;
}

interface DiscordPollingResult {
  isSuccess: boolean;
  discordInfo?: DiscordResponse;
}

export const pollDiscordStatus = async (): Promise<DiscordPollingResult> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/discord/myid`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`ERROR on polling: ${response.status}`);
    }

    const data: DiscordResponse = await response.json();

    return {
      isSuccess: data.discordId !== null,
      discordInfo: data,
    };
  } catch (err) {
    console.error("디스코드 폴링 중 오류 발생:", err);
    throw err;
  }
};

export const startDiscordPolling = (
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>
) => {
  let pollingActive = true;
  const interval = 5000;

  const pollDiscordStatusInterval = async () => {
    try {
      const result = await pollDiscordStatus();
      if (!pollingActive) return;

      setIsValid(result.isSuccess);

      if (result.isSuccess) {
        pollingActive = false;
        clearInterval(pollingInterval);
      }
    } catch (error) {
      console.error("디스코드 폴링 실패:", error);
    }
  };

  const pollingInterval = setInterval(pollDiscordStatusInterval, interval);
  pollDiscordStatusInterval();

  return () => {
    pollingActive = false;
    clearInterval(pollingInterval);
  };
};
