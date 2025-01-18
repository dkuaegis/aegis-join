import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { GetPaymentInfo } from "@/types/api/payment";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";



function Payment({
  isValid,
  startPolling,
  senderNameID,
  payInfo,
}: {  
  isValid: boolean;
  startPolling: (isValid: boolean) => void;
  senderNameID: string;
  payInfo: GetPaymentInfo;
}) { 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accountMessage, setAccountMessage] = useState<string | null>(null);
  const [senderMessage, setSenderMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  useEffect(() => {
    // 여기서의 isValid 는 송금 완료의 의미를 가진다.
    if(isValid === false) {
      startPolling(true);
    } else {
      startPolling(false);
    }
  }, []);

  useEffect(() => {
    if(senderNameID === "") setIsLoading(true);
    else setIsLoading(false);
  })

  const copyAccountNumber = () => {
    const accountNumber = "IBK기업은행 98215064101017";
    navigator.clipboard
      .writeText(accountNumber)
      .then(() => {
        setAccountMessage("계좌번호가 복사되었습니다!");
        setMessageType("success");
        setTimeout(() => setAccountMessage(null), 1500);
      })
      .catch(() => {
        setAccountMessage("복사에 실패했습니다.");
        setMessageType("error");
        setTimeout(() => setAccountMessage(null), 2000);
      });
  };

  const copySenderName = () => {
    navigator.clipboard
      .writeText(senderNameID)
      .then(() => {
        setSenderMessage("송금자명이 복사되었습니다!");
        setMessageType("success");
        setTimeout(() => setSenderMessage(null), 1500);
      })
      .catch(() => {
        setSenderMessage("복사에 실패했습니다.");
        setMessageType("error");
        setTimeout(() => setSenderMessage(null), 2000);
      });
  };

  // Calculate remaining amount
  const remainingAmount = payInfo
    ? payInfo.expectedDepositAmount - payInfo.currentDepositAmount
    : null;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">회비 납부</h3>
      <Label className="space-y-2 text-base">송금 안내</Label>
      <Alert>
        <AlertDescription className="space-y-2 text-base">
          <div className="flex items-center">
            <span>계좌번호: IBK기업은행 98215064101017</span>
            <Copy
              className="ml-2 cursor-pointer text-gray-600 hover:text-gray-800"
              size={16}
              onClick={copyAccountNumber}
            />
          </div>
          {accountMessage && (
            <p
              className={`text-xs ${messageType === "success" ? "text-green-500" : "text-red-500"}`}
            >
              {accountMessage}
            </p>
          )}
          <div className="flex items-center">
            <span>
              송금자명:{" "}
              {isLoading
                ? "로딩 중..."
                : senderNameID !== null
                  ? senderNameID
                  : "정보를 불러오지 못했습니다."}
            </span>
            <Copy
              className="ml-2 cursor-pointer text-gray-600 hover:text-gray-800"
              size={16}
              onClick={copySenderName}
            />
          </div>
          {senderMessage && (
            <p
              className={`text-xs ${messageType === "success" ? "text-green-500" : "text-red-500"}`}
            >
              {senderMessage}
            </p>
          )}
          <div>
            송금할 금액:{" "}
            {isLoading
              ? "로딩 중..."
              : remainingAmount !== null
                ? `${remainingAmount.toLocaleString()}원`
                : "정보를 불러오지 못했습니다."}
          </div>
          <div>예금주명: 윤성민</div>
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default Payment;
