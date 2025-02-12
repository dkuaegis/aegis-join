import {
  CheckCircleIcon,
  CircleHelp,
  ExternalLink,
  LoaderCircle,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../ui/button";
import AlertBox from "../../ui/custom/alertbox";
import NavigationButtons from "../../ui/custom/navigationButton";
import { fetchDiscordCode, startDiscordPolling } from "./Discord.Api";
import CopyToClipboard from "./Discord.Copy";

function Discord({
  onNext,
  onPrev,
}: { onNext: () => void; onPrev: () => void }) {
  const [code, setCode] = useState<string>("");
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );
  const [isValid, setIsValid] = useState<boolean>(false);

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

  useEffect(() => {
    if (copyMessage) {
      const timer = setTimeout(() => setCopyMessage(null), 1500);
      return () => clearTimeout(timer);
    }
  }, [copyMessage]);

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
              {code && (
                <CopyToClipboard
                  code={code}
                  setCopyMessage={setCopyMessage}
                  setMessageType={setMessageType}
                />
              )}
            </div>
            <Button
              variant="secondary"
              onClick={() => window.open("https://discord.com", "_blank")}
            >
              디스코드
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className=" flex w-full items-center justify-center">
            {copyMessage && (
              <p
                className={`text-xs ${messageType === "success" ? "text-green-500" : "text-red-500"}`}
              >
                {copyMessage}
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
