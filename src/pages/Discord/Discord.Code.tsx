import type React from "react";
import { RefreshCcw, CopyIcon } from "lucide-react";

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
      <p 
        className="font-medium text-5xl cursor-pointer p-4 rounded-4xl transition-colors hover:bg-neutral-200"
        onClick={onRefresh}
      >
        {code}
      </p>
      <div className="flex gap-4">
      <button
        onClick={onRefresh}
        type="button"
        className="flex items-center gap-1 text-neutral-500 underline cursor-pointer p-1 rounded-2xl transition-colors hover:bg-neutral-200"
      >
        <RefreshCcw size="12" />
        <span>새로고침</span>
      </button>
      <button
        onClick={handleCopy}
        type="button"
        className="flex items-center gap-1 text-slate-500 underline cursor-pointer p-1 rounded-2xl transition-colors hover:bg-neutral-200"
      >
        <CopyIcon size={16}/>
        <span>복사하기</span>
      </button>
      </div>
    </div>
  );
};

export default DiscordCode;
