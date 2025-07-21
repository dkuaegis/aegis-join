import {
  CheckCircleIcon,
  CircleHelp,
  Copy,
  ExternalLink,
  LoaderCircle,
  RefreshCcw,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AlertBox from "@/components/ui/custom/alertbox";
import useCopyToClipboard from "@/components/ui/custom/copyToClipboard";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import { fetchDiscordCode, startDiscordPolling } from "./Discord.Api";
import HowtoDo from "./Discord.HowtoDo";
import DiscordLinkButton from "@/components/ui/custom/discord-link-button";

interface DiscordProps {
  onNext: () => void;
  onPrev: () => void;
}

const Discord = ({ onNext, onPrev }: DiscordProps) => {
  const [code, setCode] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const { copyToClipboard } = useCopyToClipboard();

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

  const handleCopyToClipboard = useCallback(() => {
    copyToClipboard(code);
  }, [code, copyToClipboard]);

  return (
    <div className="line-breaks space-y-4">
      <DiscordLinkButton
        text="Aegis discord"
        url={import.meta.env.VITE_DISCORD_INVITE_URL} 
      />
      <div className="space-y-2">
        <div className="flex flex-col items-center justify-center rounded-lg bg-secondary p-6">
          <div className="flex items-center justify-center gap-x-4">
            <div className="flex items-center gap-2">
              <span className="truncate font-extrabold text-2xl text-primary">
                {isValid ? "연동 완료" : code || "불러오는 중..."}
              </span>
              {!isValid && (
                <>
                  <Button
                    className="mr-2 border-2 border-gray-600"
                    variant="secondary"
                    size="icon"
                    onClick={handleCopyToClipboard}
                    disabled={!code}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    className="border-2 border-gray-600"
                    variant="secondary"
                    size="icon"
                    onClick={handleRefresh}
                  >
                    <RefreshCcw className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
            <Button
              className="border-2 border-gray-600"
              variant="secondary"
              onClick={() =>
                window.open(`${import.meta.env.VITE_DISCORD_INVITE_URL}`)
              }
            >
              디스코드
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>


      <NavigationButtons prev={onPrev} next={handleNext} isValid={isValid} />
    </div>
  );
};

export default Discord;
