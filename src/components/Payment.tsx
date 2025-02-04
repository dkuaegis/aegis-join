import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import type { GetPaymentInfo } from "@/types/api/payment";
import { CheckCircleIcon, CircleAlert, Copy, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import AlertBox from "./ui/custom/alertbox";

function Payment({
  isValid,
  isOverpaid,
  payInfo,
  senderName,
  onNext,
  onPrev,
}: {
  isValid: boolean;
  isOverpaid: boolean;
  senderName: string;
  payInfo: GetPaymentInfo;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accountMessage, setAccountMessage] = useState<string | null>(null);
  const [senderMessage, setSenderMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  console.log(onNext, onPrev);

  //동아리 정보
  const ADMIN_INFO = {
    phoneNumber: "010-2439-1815",
    kakaoId: "yun_seongmin",
    accountNumber: "IBK기업은행 98215064101017",
  };

  useEffect(() => {
    if (senderName === "") setIsLoading(true);
    else setIsLoading(false);
  }, [senderName]);

  const copyAccountNumber = () => {
    navigator.clipboard
      .writeText(ADMIN_INFO.accountNumber)
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
      .writeText(senderName)
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
  const remainingAmount =
    payInfo.expectedDepositAmount - payInfo.currentDepositAmount;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">회비 납부</h3>
      <Label className="space-y-2 text-base">송금 안내</Label>
      <Alert>
        <AlertDescription className="space-y-2 text-base">
          <div className="flex items-center">
            <span>계좌번호: {ADMIN_INFO.accountNumber}</span>
            <Copy
              className="ml-2 cursor-pointer text-gray-600 hover:text-gray-800"
              size={16}
              onClick={copyAccountNumber}
            />
          </div>
          {accountMessage && (
            <p
              className={`text-xs ${
                messageType === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {accountMessage}
            </p>
          )}
          <div className="flex items-center">
            <span>
              송금자명:{" "}
              {isLoading
                ? "로딩 중..."
                : senderName || "정보를 불러오지 못했습니다."}
            </span>
            <Copy
              className="ml-2 cursor-pointer text-gray-600 hover:text-gray-800"
              size={16}
              onClick={copySenderName}
            />
          </div>
          {senderMessage && (
            <p
              className={`text-xs ${
                messageType === "success" ? "text-green-500" : "text-red-500"
              }`}
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
      {isValid === false && payInfo.currentDepositAmount > 0 && (
        <AlertBox
          icon={<CircleAlert className="h-4 w-4" />}
          title="회비 추가 납부 안내"
          description={[
            "아직 회비가 완납되지 않았습니다.",
            `남은 금액 ${remainingAmount.toLocaleString()}원을 납부해주세요.`,
          ]}
        />
      )}
      <div className="flex items-center justify-center">
        {isOverpaid ? (
          <AlertBox
            icon={<CircleAlert className="h-4 w-4" />}
            title="회비 초과 납부 안내"
            description={[
              "초과 납부가 발생한 경우에도 회원가입은 정상적으로 처리됩니다. 환불이 필요하시면 운영진에게 문의해 주세요.",
              `연락처: ${ADMIN_INFO.phoneNumber}`,
              `카카오톡 ID: ${ADMIN_INFO.kakaoId}`,
            ]}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Payment;
