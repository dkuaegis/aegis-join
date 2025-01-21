import {
  CheckCircleIcon,
  CircleHelp,
  ExternalLink,
  LoaderCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Button } from "./ui/button";

function Discord({
  setPolling,
  isValid,
}: {
  setPolling: (isValid: boolean) => void;
  isValid: boolean;
}) {
  const [discordLink, setDiscordLink] = useState<string>("");

  // 디스코드 페이지를 get 했을 때 link 를 보내주지만, 이때 이미 사용자가 가입해있으면 어떡함?
  useEffect(() => {
    const fetchDiscordLink = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/discord/link`
        );
        if (!response.ok) {
          throw new Error(`HTTP ERROR! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setDiscordLink(data.discordLink);
      } catch (err: unknown) {}
    };

    fetchDiscordLink();
  }, []);

  function discordCheck() {
    window.open(discordLink, "_blank");
    setPolling(true);
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">디스코드 연동</h3>
      <Alert>
        <CircleHelp className="h-4 w-4" />
        <AlertTitle>디스코드 연동이 왜 필요한가요?</AlertTitle>
        <AlertDescription>어쩌구 저쩌구</AlertDescription>
      </Alert>
      <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
        <span className="truncate font-medium text-sm shadow-none">
          {discordLink}
        </span>
        <Button
          className="shadow-none"
          variant="secondary"
          onClick={() => discordCheck()}
        >
          참여하기
          <ExternalLink className="mr-2 h-4 w-2" />
        </Button>
      </div>
      <div className="flex items-center justify-center">
        {isValid ? (
          <>
            <CheckCircleIcon className="h-8 w-8 text-green-400" />
            <p className="pl-4 text-green-400">가입 확인이 완료되었습니다 !</p>
          </>
        ) : (
          <>
            <LoaderCircle
              className="h-8 w-8 animate-spin text-gray-500"
              style={{ animation: "spin 3s linear infinite" }}
            />
            <p className="pl-4">디스코드 가입 확인 중입니다 . . .</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Discord;
