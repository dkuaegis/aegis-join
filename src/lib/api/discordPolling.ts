

export const startDiscordPolling = async (
    onValidate: (isValid: boolean) => void,
  ) => {
    const interval = 2000;
    let attempts = 0;
  
    const poll = async () => {
        try {
            const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/discord/check`
            );
            if (!response.ok) {
                throw new Error("ERROR on polling");
            }
  
        if (response.status === 200) {
            onValidate(true);
          return; // 폴링 중단
        }

        attempts++;
        setTimeout(poll, interval); // 재귀 호출로 다음 폴링 수행
      } catch (err: unknown) {
        onValidate(false);
      }
    };
  
    poll();
  };