import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import useCopyToClipboard from "@/components/ui/custom/copyToClipboard";
import { Label } from "@/components/ui/label";
import type { GetPaymentInfo } from "@/types/api/payment";

import { Copy } from "lucide-react";
import { useState } from "react";
import { ADMIN_INFO } from "./Payment.Config";

interface InformationProps {
  senderName: string;
  isLoading: boolean;
  payInfo: GetPaymentInfo | null;
  remainingAmount: number;
}

type CopyStep = "AccountNumber" | "SenderName" | "End";

const Information = ({
  senderName,
  isLoading,
  payInfo,
  remainingAmount,
}: InformationProps) => {
  const [copyStep, setCopyStep] = useState<CopyStep>("AccountNumber");
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
              className={`h-6 w-6 flex-shrink-0 p-0 ${copyStep === "AccountNumber" ? "animate-pulse border border-amber-300 bg-amber-50 text-amber-700 shadow-sm hover:bg-amber-100 hover:shadow" : ""}
                  `}
              onClick={() => {
                copyToClipboard(ADMIN_INFO.accountNumber);
                setCopyStep("SenderName");
              }}
              aria-label="계좌번호 복사하기"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex items-center">
            <span className="w-20 font-medium">입금자명:</span>
            <span className="mr-1 pr-0">{senderName}</span>
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 w-6 flex-shrink-0 p-0 ${copyStep === "SenderName" ? "animate-pulse border border-amber-300 bg-amber-50 text-amber-700 shadow-sm hover:bg-amber-100 hover:shadow" : ""}
                  `}
              onClick={() => {
                copyToClipboard(senderName);
                setCopyStep("End");
              }}
              aria-label="입금자명 복사하기"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex items-center">
            <span className="w-20 font-medium">입금할 금액:</span>
            <span>
              {isLoading
                ? "로딩 중..."
                : payInfo
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
