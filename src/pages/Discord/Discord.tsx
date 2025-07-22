import { useCallback, useEffect, useState } from "react";
import DiscordLinkButton from "@/components/ui/custom/discord-link-button";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import useFunnel from "@/hooks/useFunnel";
import DiscordCode from "@/pages/Discord/Discord.Code";
import { fetchDiscordCode, startDiscordPolling } from "./Discord.Api";
import DiscordComplete from "./Discord.Complete";
import { DiscordWhy } from "./Discord.Why";

const Discord = () => {
  const { next } = useFunnel();
  const [code, setCode] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const getDiscordCode = useCallback(async () => {
    try {
      const fetchedCode = await fetchDiscordCode();
      setCode(fetchedCode);
    } catch (err) {
      console.error("디스코드 인증코드 에러:", err);
    }
  }, []);

  const handleRefresh = useCallback(() => {
    getDiscordCode();
  }, [getDiscordCode]);

  useEffect(() => {
    getDiscordCode();

    const cleanupPolling = startDiscordPolling(setIsValid);
    return () => {
      cleanupPolling();
    };
  }, [getDiscordCode]);

  const _handleNext = useCallback(() => {
    if (isValid) next();
  }, [isValid, next]);

  return (
    <div className="gap-12 space-y-4 py-9">
      {isValid ? (
        <DiscordComplete />
      ) : (
        <div className="space-y-4">
          <DiscordCode
            code={code || "12345"}
            isValid={isValid}
            onRefresh={handleRefresh}
          />

          <DiscordLinkButton
            text="Aegis discord"
            url={import.meta.env.VITE_DISCORD_INVITE_URL}
          />
          <DiscordWhy />
        </div>
      )}
      <NavigationButtons isValid={isValid} />
    </div>
  );
};

export default Discord;
