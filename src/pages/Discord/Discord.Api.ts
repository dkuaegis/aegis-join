import fetchingWithToast from "@/lib/customFetch";

export const fetchDiscordCode = async (): Promise<string> => {
  try {
    const response = await fetchingWithToast(
      `${import.meta.env.VITE_API_URL}/discord/issue-verification-code`,
      {
        //credentials: "include",
        method: "POST",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP ERROR! status: ${response.status}`);
    }
    const data = await response.json();
    return data.code;
  } catch (err: unknown) {
    console.error("Failed to fetch Discord code:", err);
    throw err;
  }
};

export const startDiscordPolling = async (): Promise<boolean> => {
  const interval = 2000;
  let attempts = 0;
  return new Promise((resolve) => {
    const poll = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/discord/myid`, {
          //credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`ERROR on polling: ${response.status}`);
        }

        const data = await response.json();

        if (data.discordId !== null) {
          resolve(true);
          return;
        }
      } catch (err) {
        console.error("디스코드 폴링 중 오류 발생:", err);
      }

      attempts++;
      setTimeout(poll, interval);
    };

    poll();
  });
};
