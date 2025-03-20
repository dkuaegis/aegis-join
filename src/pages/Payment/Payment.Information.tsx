import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import useCopyToClipboard from "@/components/ui/custom/copyToClipboard";
import { Label } from "@/components/ui/label";
import type { GetPaymentInfo } from "@/types/api/payment";

import { Copy } from "lucide-react";
import { ADMIN_INFO } from "./Payment.Config";

interface InformationProps {
  payInfo: GetPaymentInfo | null;
  remainingAmount: number;
}


const Information = ({
  payInfo,
  remainingAmount,
}: InformationProps) => {
  const { copyToClipboard } = useCopyToClipboard();
  return (
    <>
      <Label className="text-base">입금 안내</Label>
      <Alert>
        <AlertDescription className="space-y-2 text-sm sm:text-base">
          <div className="flex items-center">
            <span className="trunum w-20 font-medi">계좌번호:</span>
            <span className="mr-1 pr-0">{ADMIN_INFO.accountNumber}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                copyToClipboard(ADMIN_INFO.accountNumber);
              }}
              aria-label="계좌번호 복사하기"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex items-center">
            <span className="w-20 font-medium">입금할 금액:</span>
            <span>
              { payInfo
                  ? `${remainingAmount.toLocaleString()}원`
                  : "정보를 불러오는 중..."}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-20 font-medium">예금주명:</span>
            <span>{ADMIN_INFO.name}</span>
          </div>
        </AlertDescription>
      </Alert>
    </>
  );
};

export default Information;
