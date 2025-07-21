import type React from "react";
import CopyToClipboardButton from "../../components/ui/custom/copy-to-clipboard-button";
import RefreshButton from "../../components/ui/custom/refresh-button";

interface AuthCodeProps {
  code: string;
  isValid: boolean;
  onRefresh: () => void;
}

const DiscordCode: React.FC<AuthCodeProps> = ({ code, onRefresh }) => {
  return (
    <div className="flex h-36 flex-col items-center gap-4">
      <p className="font-medium text-5xl">{code}</p>
      <div className="flex gap-4">
        <RefreshButton onClick={onRefresh} />
        <CopyToClipboardButton textToCopy={code} />
      </div>
    </div>
  );
};

export default DiscordCode;
