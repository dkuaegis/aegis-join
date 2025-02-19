import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import useCopyToClipboard from "@/components/ui/custom/copyToClipboard";
import { Label } from "@/components/ui/label";
import type { GetPaymentInfo } from "@/types/api/payment";
import { CheckCircleIcon, CircleAlert, Copy, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import AlertBox from "../../components/ui/custom/alertbox";
import NavigationButtons from "../../components/ui/custom/navigationButton";
import { fetchPersonalInfoData } from "../PersonalInfo/PersonalInfo.Api";
import { startPaymentPolling } from "./Payment.Api";

const ADMIN_INFO = {
  phoneNumber:
    import.meta.env.VITE_ADMIN_PHONE ?? "환경변수가 설정되지 않았습니다.",
  kakaoId:
    import.meta.env.VITE_ADMIN_KAKAO ?? "환경변수가 설정되지 않았습니다.",
  accountNumber:
    import.meta.env.VITE_ADMIN_ACCOUNT_NUMBER ??
    "환경변수가 설정되지 않았습니다.",
};

function Payment({
  onNext,
  onPrev,
}: { onNext: () => void; onPrev: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [senderName, setSenderName] = useState("로딩 중...");
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [payInfo, setPayInfo] = useState<GetPaymentInfo | null>(null);

  const { copyMessage, copyToClipboard } = useCopyToClipboard();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPersonalInfoData();
        const lastSixStudentId = data.studentId.slice(-6);
        setSenderName(`${data.name}${lastSixStudentId}`);
      } catch (error) {
        console.error("Failed to fetch personal info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const cleanupPolling = startPaymentPolling(
      setIsValid,
      setPayInfo,
      setRemainingAmount
    );

    return () => {
      cleanupPolling();
    };
  }, []);

  useEffect(() => {
    if (payInfo) {
      setRemainingAmount(
        payInfo.expectedDepositAmount - payInfo.currentDepositAmount
      );
    }
  }, [payInfo]);

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">회비 납부</h3>
      <Label className="space-y-2 text-base">송금 안내</Label>
      <Alert>
        <AlertDescription className="space-y-2 text-base">
          <div>
            <div className="flex items-center">
              <span>계좌번호: {ADMIN_INFO.accountNumber}</span>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={() =>
                  copyToClipboard(ADMIN_INFO.accountNumber ?? "", "account")
                }
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {copyMessage.account && (
              <p
                className={`text-xs ${
                  copyMessage.account.includes("클립보드에 복사했습니다!")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {copyMessage.account}
              </p>
            )}
          </div>
          <div>
            <div className="flex items-center">
              <span>송금자명: {senderName}</span>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2"
                onClick={() => copyToClipboard(senderName, "sender")}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {copyMessage.sender && (
              <p
                className={`text-xs ${
                  copyMessage.sender.includes("클립보드에 복사했습니다!")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {copyMessage.sender}
              </p>
            )}
          </div>
          <div>
            송금할 금액:{" "}
            {isLoading
              ? "로딩 중..."
              : payInfo
                ? `${remainingAmount.toLocaleString()}원`
                : "정보를 불러오는 중..."}
          </div>
          <div>예금주명: 윤성민</div>
        </AlertDescription>
      </Alert>

      {isValid === false && payInfo && payInfo.currentDepositAmount > 0 && (
        <AlertBox
          icon={<CircleAlert className="h-4 w-4" />}
          title="회비 추가 납부 안내"
          description={[
            "아직 회비가 완납되지 않았습니다.",
            `남은 금액 ${remainingAmount.toLocaleString()}원을 납부해주세요.`,
          ]}
        />
      )}

      {payInfo && payInfo.status === "OVERPAID" && (
        <AlertBox
          icon={<CircleAlert className="h-4 w-4" />}
          title="회비 초과 납부 안내"
          description={[
            "초과 납부가 발생한 경우에도 회원가입은 정상적으로 처리됩니다. 환불이 필요하시면 운영진에게 문의해 주세요.",
            `연락처: ${ADMIN_INFO.phoneNumber}`,
            `카카오톡 ID: ${ADMIN_INFO.kakaoId}`,
          ]}
        />
      )}

      <div className="flex items-center justify-center">
        {isValid ? (
          <>
            <CheckCircleIcon className="h-8 w-8 text-green-400" />
            <p className="pl-4 text-green-400">동아리 가입이 완료되었습니다!</p>
          </>
        ) : (
          <>
            <LoaderCircle className="h-8 w-8 animate-spin text-gray-500" />
            <p className="pl-4">회비를 납부해주세요.</p>
          </>
        )}
      </div>

      <NavigationButtons prev={onPrev} next={onNext} />
    </div>
  );
}

export default Payment;