import { Copy } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import useCopyToClipboard from "@/components/ui/custom/copyToClipboard";
import { ADMIN_INFO } from "./Payment.Config";

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
  const { copyToClipboard } = useCopyToClipboard();

  return (
    <Alert>
      <AlertDescription className="h-24 space-y-2 text-base sm:text-base">
        <InfoRow
          label="계좌번호"
          value={ADMIN_INFO.accountNumber}
          onCopy={() => copyToClipboard(ADMIN_INFO.accountNumber)}
        />
        <InfoRow label="예금주명" value={ADMIN_INFO.name} />
      </AlertDescription>
    </Alert>
  );
};

export default Information;
