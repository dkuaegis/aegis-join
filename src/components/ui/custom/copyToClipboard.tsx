import { useCallback, useState } from "react";

type CopyMessageType = {
  account?: string | null;
  sender?: string | null;
  discord?: string | null;
};

type CopyType = "account" | "sender" | "discord";

interface UseCopyToClipboard {
  copyMessage: CopyMessageType;
  copyToClipboard: (text: string, type: CopyType) => void;
}

function useCopyToClipboard(): UseCopyToClipboard {
  const [copyMessage, setCopyMessage] = useState<CopyMessageType>({});

  const copyToClipboard = useCallback((text: string, type: CopyType) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyMessage((prev) => ({
          ...prev,
          [type]: "클립보드에 복사했습니다!",
        }));
        setTimeout(
          () => setCopyMessage((prev) => ({ ...prev, [type]: null })),
          1500
        );
      })
      .catch(() => {
        setCopyMessage((prev) => ({ ...prev, [type]: "복사에 실패했습니다." }));
        setTimeout(
          () => setCopyMessage((prev) => ({ ...prev, [type]: null })),
          1500
        );
      });
  }, []);

  return { copyMessage, copyToClipboard };
}

export default useCopyToClipboard;
