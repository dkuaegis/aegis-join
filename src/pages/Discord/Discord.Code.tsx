import { CopyIcon, RefreshCcw } from "lucide-react";
import type React from "react";
import toast from "react-hot-toast";
import { Analytics } from "@/service/analytics";

interface AuthCodeProps {
  code: string;
  isValid: boolean;
  onRefresh: () => void;
}

const DiscordCode: React.FC<AuthCodeProps> = ({ code, onRefresh }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("코드가 복사되었습니다.");
      Analytics.trackEvent("Discord_Code_Copied", { category: "Discord" });
    } catch (error) {
      toast.error("코드 복사에 실패했습니다. 브라우저 권한을 확인해주세요.");
      console.error("copy failed:", error);
      Analytics.trackEvent("Discord_Code_Copy_Failed", {
        category: "Discord",
        error_message: error instanceof Error ? error.message : String(error ?? ""),
      });
    }
  };
  return (
    <div className="flex h-36 flex-col items-center gap-4">
      <button
        className="cursor-pointer rounded-4xl p-4 font-medium text-5xl transition-colors hover:bg-neutral-200"
        type="button"
        onClick={() => handleCopy()}
      >
        {code}
      </button>
      <div className="flex gap-4">
        <button
          onClick={() => {
            Analytics.trackEvent("Discord_Code_Refresh_Click", { category: "Discord" });
            onRefresh();
          }}
          type="button"
          className="flex cursor-pointer items-center gap-1 rounded-2xl p-1 text-neutral-500 underline transition-colors hover:bg-neutral-200"
        >
          <RefreshCcw size="12" />
          <span>새로고침</span>
        </button>
        <button
          onClick={() => handleCopy()}
          type="button"
          className="flex cursor-pointer items-center gap-1 rounded-2xl p-1 text-slate-500 underline transition-colors hover:bg-neutral-200"
        >
          <CopyIcon size={16} />
          <span>복사하기</span>
        </button>
      </div>
    </div>
  );
};

export default DiscordCode;
