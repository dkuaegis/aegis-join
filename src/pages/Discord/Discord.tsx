import { useCallback, useEffect, useState } from "react";
import AuthCode from "@/pages/Discord/Discord.Code";
import DiscordLinkButton from "@/components/ui/custom/discord-link-button";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import { fetchDiscordCode, startDiscordPolling } from "./Discord.Api";
interface DiscordProps {
  onNext: () => void;
  onPrev: () => void;
}

const Discord = ({ onNext, onPrev }: DiscordProps) => {
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

  const handleNext = useCallback(() => {
    if (isValid) onNext();
  }, [isValid, onNext]);

  return (
    <div className="space-y-4 py-9 gap-12">
      {isValid ? (
        <div className="text-2xl font-extrabold text-primary">
          연동 완료
        </div>
      ) : (
        <AuthCode code={code || "99494"} onRefresh={handleRefresh} />
      )}
      <DiscordLinkButton
        text="Aegis discord"
        url={import.meta.env.VITE_DISCORD_INVITE_URL}
      />

      <NavigationButtons prev={onPrev} next={handleNext} isValid={isValid} />
    </div>
  );
};

export default Discord;
