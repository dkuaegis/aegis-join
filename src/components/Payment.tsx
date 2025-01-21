import { Alert, AlertDescription, AlertTitle, } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import type { GetPaymentInfo } from "@/types/api/payment";
import { Copy, CheckCircleIcon, LoaderCircle, CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";

function Payment({
  isValid,
  isOverpaid,
  startPolling,
  senderNameID,
  payInfo,
}: {
  isValid: boolean;
  isOverpaid: boolean;
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
    if (isValid === false) {
      startPolling(true);
    } else {
      startPolling(false);
    }
  }, [isValid, startPolling]);

  useEffect(() => {
    if (senderNameID === "") setIsLoading(true);
    else setIsLoading(false);
  }, [senderNameID]);

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
      <div className="flex items-center justify-center">
        {isValid ? (
          <>
            <CheckCircleIcon className="h-8 w-8 text-green-400" />
            <p className="pl-4 text-green-400">동아리 가입이 완료되었습니다!</p>
          </>
        ) : (
          <>
            <LoaderCircle
              className="h-8 w-8 animate-spin text-gray-500"
              style={{ animation: "spin 3s linear infinite" }}
            />
            <p className="pl-4">회비를 납부해주세요.</p>
          </>
        )}
      </div>
      {/* 금액이 초과된 경우 */}
      <div className="flex items-center justify-center">
        {isOverpaid ? (
          <Alert>
            <CircleAlert className="h-4 w-4" />
            <AlertTitle>회비 초과 납부 안내</AlertTitle>
            <AlertDescription>
              초과 납부가 발생한 경우에도 회원가입은 정상적으로 처리됩니다.
              환불이 필요하시면 운영진에게 문의해 주세요.
              </AlertDescription>
              <AlertDescription>
              연락처: 010-2439-1815
              </AlertDescription>
              <AlertDescription>
              카카오톡 ID: yun_seongmin
            </AlertDescription>
        </Alert>
        ) :(null)}
      </div>
    </div>
  );
}

export default Payment;
