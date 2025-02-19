import useCopyToClipboard from "@/components/ui/custom/copyToClipboard";
import {
  CheckCircleIcon,
  CircleHelp,
  Copy,
  ExternalLink,
  LoaderCircle,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import AlertBox from "../../components/ui/custom/alertbox";
import NavigationButtons from "../../components/ui/custom/navigationButton";
import { fetchDiscordCode, startDiscordPolling } from "./Discord.Api";
function Discord({
  onNext,
  onPrev,
}: { onNext: () => void; onPrev: () => void }) {
  const [code, setCode] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const { copyMessage, copyToClipboard } = useCopyToClipboard();
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  useEffect(() => {
    const getDiscordCode = async () => {
      try {
        const fetchedCode = await fetchDiscordCode();
        setCode(fetchedCode);
      } catch (err: unknown) {
        console.error("Failed to fetch Discord code:", err);
      }
    };

    getDiscordCode();
  }, []);

  useEffect(() => {
    const pollDiscordStatus = async () => {
      try {
        const joined = await startDiscordPolling();
        setIsValid(joined);
      } catch (error) {
        console.error("Discord polling failed:", error);
      }
    };

    pollDiscordStatus();
  }, []);

  const handleNext = useCallback(() => {
    if (isValid) onNext();
  }, [isValid, onNext]);

  const handleCopyToClipboard = useCallback(() => {
    copyToClipboard(code, "discord");
  }, [code, copyToClipboard]);

  useEffect(() => {
    if (copyMessage.discord === "클립보드에 복사했습니다!") {
      setMessageType("success");
    } else if (copyMessage.discord === "복사에 실패했습니다.") {
      setMessageType("error");
    } else {
      setMessageType(null);
    }
  }, [copyMessage.discord]);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">디스코드 연동</h3>
      <AlertBox
        icon={<CircleHelp className="h-4 w-4" />}
        title="디스코드 연동이 왜 필요한가요?"
        description={["어쩌구 저쩌구"]}
      />
      <div className="space-y-2">
        <div className="flex flex-col items-center justify-center gap-y-4 rounded-lg bg-secondary p-6">
          <div className="flex items-center justify-center gap-x-4">
            <div className="flex items-center gap-2">
              <span className="truncate font-extrabold text-2xl text-primary">
                {code || "코드 불러오는 중..."}
              </span>
              <Button
                variant="secondary"
                size="icon"
                onClick={handleCopyToClipboard}
                disabled={!code}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="secondary"
              onClick={() => window.open("https://discord.com", "_blank")}
            >
              디스코드
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="w-full text-left">
            {copyMessage.discord && (
              <p
                className={`ml-8 text-xs ${
                  messageType === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {copyMessage.discord}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        {isValid ? (
          <>
            <CheckCircleIcon className="h-8 w-8 text-green-400" />
            <p className="pl-4 text-green-400">가입 확인이 완료되었습니다!</p>
          </>
        ) : (
          <>
            <LoaderCircle className="h-8 w-8 animate-spin text-gray-500" />
            <p className="pl-4">디스코드 가입 확인 중입니다 . . .</p>
          </>
        )}
      </div>

      <NavigationButtons prev={onPrev} next={handleNext} isValid={isValid} />
    </div>
  );
}

export default Discord;