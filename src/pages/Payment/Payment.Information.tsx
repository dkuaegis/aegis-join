import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import useCopyToClipboard from "@/components/ui/custom/copyToClipboard";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { ADMIN_INFO } from "./Payment.Config";
import type { GetPaymentInfo } from "@/types/api/payment";

interface InformationProps {
  payInfo: GetPaymentInfo | null;
  remainingAmount: number;
}

const InfoRow = ({
  label,
  value,
  onCopy,
}: { label: string; value: string; onCopy?: () => void }) => (
  <div className="flex items-center">
    <span className="w-20 font-medium">{label}:</span>
    <span>{value}</span>
    {onCopy && (
      <Button
        variant="ghost"
        size="sm"
        onClick={onCopy}
        aria-label={`${label} 복사하기`}
      >
        <Copy className="h-3 w-3" />
      </Button>
    )}
  </div>
);

const Information = ({ payInfo, remainingAmount }: InformationProps) => {
  const { copyToClipboard } = useCopyToClipboard();

  return (
    <>
      <Label className="text-base">입금 안내</Label>
      <Alert>
        <AlertDescription className="space-y-2 text-sm sm:text-base">
          <InfoRow
            label="계좌번호"
            value={ADMIN_INFO.accountNumber}
            onCopy={() => copyToClipboard(ADMIN_INFO.accountNumber)}
          />
          {payInfo ? (
            <InfoRow
              label="입금할 금액"
              value={`${remainingAmount.toLocaleString()}원`}
            />
          ) : (
            "정보를 불러오는 중..."
          )}
          <InfoRow label="예금주명" value={ADMIN_INFO.name} />
        </AlertDescription>
      </Alert>
    </>
  );
};

export default Information;
