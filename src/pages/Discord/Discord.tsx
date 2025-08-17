import React, { Suspense, useCallback, useEffect, useState } from "react";
import DiscordLinkButton from "@/components/ui/custom/discord-link-button";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import useFunnel from "@/hooks/useFunnel";
import DiscordCode from "@/pages/Discord/Discord.Code";
import { Analytics } from "@/service/analytics";
import { fetchDiscordCode } from "./Discord.Api";
import { DiscordWhy } from "./Discord.Why";
import { useDiscordPolling } from "./useDiscordPolling";

const Complete = React.lazy(() => import("@/components/ui/custom/complete"));

const Discord = () => {
  const [code, setCode] = useState<string>("\u00A0");
  const { next } = useFunnel();
  const { isValid, status } = useDiscordPolling();

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
  }, [getDiscordCode]);

  if (status === "loading") {
    return null;
  }

  return (
    <div className="gap-12 space-y-4 py-9">
      {isValid ? (
        <>
          <Suspense>
            <Complete message="연동을 완료했어요" />
          </Suspense>
          <NavigationButtons
            disabled={!isValid}
            onClick={() => {
              Analytics.trackEvent("Discord_Next_Click", {
                category: "Discord",
              });
              next();
            }}
          />
        </>
      ) : (
        <div className="space-y-4 break-words">
          <DiscordCode
            code={code}
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
    </div>
  );
};

export default Discord;
