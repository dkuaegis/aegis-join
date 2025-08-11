import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const InfoRow = ({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
  onCopy?: () => void;
}) => (
  <div className="flex items-center space-x-2">
    <span className="w-20 font-medium">{label}</span>
    <span>{value}</span>
    {onCopy && (
      <Button
        variant="icon"
        size="lg"
        onClick={onCopy}
        aria-label={`${label} 복사하기`}
      >
        <Copy size={16} />
      </Button>
    )}
  </div>
);

const Information = () => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        import.meta.env.VITE_ADMIN_ACCOUNT_NUMBER
      );
      toast.success("복사되었습니다.");
    } catch (error) {
      toast.error("복사에 실패했습니다. 브라우저 권한을 확인해주세요.");
      console.error("copy failed:", error);
    }

  return (
    <Alert>
      <AlertDescription className="h-24 space-y-2 text-base sm:text-base">
        <InfoRow
          label="계좌번호"
          value={import.meta.env.VITE_ADMIN_ACCOUNT_NUMBER}
          onCopy={handleCopy}
        />
        <InfoRow label="예금주명" value={"윤성민"} />
      </AlertDescription>
    </Alert>
  );
};

export default Information;
