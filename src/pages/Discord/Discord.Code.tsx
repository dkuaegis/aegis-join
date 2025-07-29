import { CopyIcon, RefreshCcw } from "lucide-react";
import type React from "react";

interface AuthCodeProps {
  code: string;
  isValid: boolean;
  onRefresh: () => void;
}

const DiscordCode: React.FC<AuthCodeProps> = ({ code, onRefresh }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };
  return (
    <div className="flex h-36 flex-col items-center gap-4">
      <button
        className="cursor-pointer rounded-4xl p-4 font-medium text-5xl transition-colors hover:bg-neutral-200"
        type="button"
        onClick={onRefresh}
      >
        {code}
      </button>
      <div className="flex gap-4">
        <button
          onClick={onRefresh}
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
