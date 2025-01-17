import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { useState } from "react";

function Payment() {
  const membershipFee = 10000;

  const [accountMessage, setAccountMessage] = useState<string | null>(null);
  const [senderMessage, setSenderMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

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
    // 송금자명. 추후 데이터 불러오기 및 파싱 요망
    const senderName = "권대근220236";
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
            {/* 송금자명. 추후데이터 불러오기 및 파싱 요망 */}
            <span>송금자명: 권대근220236</span>
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
          <div>송금할 금액: {membershipFee.toLocaleString()}원</div>
          <div>예금주명: 윤성민</div>
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default Payment;
