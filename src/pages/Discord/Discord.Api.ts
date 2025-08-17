import { httpClient } from "@/api/api";
import { Analytics } from "@/service/analytics";

interface DiscordResponse {
  discordId: string | null;
}

interface DiscordPollingResult {
  isSuccess: boolean;
  discordInfo?: DiscordResponse;
}

export const fetchDiscordCode = async (): Promise<string> => {
  try {
    Analytics.trackEvent("Discord_Code_Issue_Start", { category: "Discord" });
    const response = await httpClient.post<{ code: string }>(
      "/discord/issue-verification-code"
    );
    Analytics.trackEvent("Discord_Code_Issue_Success", { category: "Discord" });
    return response.code;
  } catch (err) {
    console.error("디스코드 인증코드 요청 에러:", err);
    Analytics.trackEvent("Discord_Code_Issue_Failed", {
      category: "Discord",
      error_message: err instanceof Error ? err.message : String(err ?? ""),
    });
    throw err;
  }
};

export const pollDiscordStatus = async (): Promise<DiscordPollingResult> => {
  try {
    const data = await httpClient.get<DiscordResponse>("/discord/myid");

    // 응답 데이터를 가공하는 비즈니스 로직은 그대로 유지합니다.
    Analytics.trackEvent("Discord_Poll_Success", {
      category: "Discord",
      is_success: data.discordId !== null,
    });
    return {
      isSuccess: data.discordId !== null,
      discordInfo: data,
    };
  } catch (err) {
    console.error("디스코드 폴링 중 오류 발생:", err);
    Analytics.trackEvent("Discord_Poll_Failed", {
      category: "Discord",
      error_message: err instanceof Error ? err.message : String(err ?? ""),
    });
    throw err;
  }
};
