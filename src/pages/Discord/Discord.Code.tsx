
import React from 'react';
import RefreshButton from '../../components/ui/custom/refresh-button';
import CopyToClipboardButton from '../../components/ui/custom/copy-to-clipboard-button';

interface AuthCodeProps {
  code: string;
  onRefresh: () => void;
}

const DiscordCode: React.FC<AuthCodeProps> = ({ code, onRefresh }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-5xl font-medium">{code}</p>
      <div className="flex gap-4">
        <RefreshButton onClick={onRefresh} />
        <CopyToClipboardButton textToCopy={code} />
      </div>
    </div>
  );
};

export default DiscordCode;
