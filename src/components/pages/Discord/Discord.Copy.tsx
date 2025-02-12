import { Copy } from "lucide-react";
import { Button } from "../../ui/button";
import { useCallback } from "react";

interface CopyToClipboardProps {
  code: string;
  setCopyMessage: (message: string | null) => void;
  setMessageType: (type: "success" | "error" | null) => void;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ code, setCopyMessage, setMessageType }) => {
  const copyToClipboard = useCallback(() => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setCopyMessage("클립보드에 복사되었습니다!");
        setMessageType("success");
      })
      .catch(() => {
        setCopyMessage("복사에 실패했습니다.");
        setMessageType("error");
      });
  }, [code, setCopyMessage, setMessageType]);

  return (
    <Button variant="secondary" size="icon" onClick={copyToClipboard} disabled={!code}>
      <Copy className="h-4 w-4" />
    </Button>
  );
};

export default CopyToClipboard;
