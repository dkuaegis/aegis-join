import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AlertBox from "@/components/ui/custom/alertbox";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import type { GetPaymentInfo } from "@/types/api/payment";
import { CircleAlert, CircleCheckBig, LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { fetchPersonalInfoData } from "../PersonalInfo/PersonalInfo.Api";
import { startPaymentPolling } from "./Payment.Api";
import { ADMIN_INFO } from "./Payment.Config";
import HowtoDo from "./Payment.HowtoDo";
import Information from "./Payment.Information";

function Payment({
  onNext,
  onPrev,
}: { onNext: () => void; onPrev: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [senderName, setSenderName] = useState("로딩 중...");
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [payInfo, setPayInfo] = useState<GetPaymentInfo | null>(null);

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

  const handleNext = useCallback(() => {
    if (!isValid || payInfo?.status === "PENDING") return;
    onNext();
  }, [onNext, isValid, payInfo?.status]);

  return (
    <div className="line-breaks space-y-4">
      <h3 className="font-semibold text-lg">회비 납부</h3>
      {payInfo && payInfo.status === "PENDING" ? (
        <Information
          senderName={senderName}
          isLoading={isLoading}
          payInfo={payInfo}
          remainingAmount={remainingAmount}
        />
      ) : (
        <Alert className="border-green-200 bg-green-50 text-green-800 shadow-sm">
          <CircleCheckBig size={24} color="#166534" />
          <AlertTitle className="font-semibold text-lg">
            입금이 완료되었습니다
          </AlertTitle>
        </Alert>
      )}
      {payInfo && payInfo.status === "PENDING" && (
        <Alert className="relative animate-shimmer border-amber-300 bg-[length:200%_100%] bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50">
          <AlertTitle className="font-bold text-amber-800">⚠️ 주의 ⚠️</AlertTitle>
          <AlertDescription className="text-amber-700">
            반드시 위에 표시된 <strong>입금자명</strong>을 정확하게
            사용해주세요. 다른 이름으로 입금 시 확인이 어렵습니다. 입금자명을
            잘못 기입했다면{" "}
            <a
              href={import.meta.env.VITE_PAYMENT_GUIDE_URL}
              target="_blank"
              className="font-semibold text-amber-900 underline hover:text-amber-600"
              rel="noreferrer"
            >
              납부 상세 가이드
            </a>
            를 참고해주세요.
          </AlertDescription>
        </Alert>
      )}

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
      {!isValid && (
        <div className="flex items-center justify-center py-4">
          <LoaderCircle className="h-8 w-8 animate-spin text-gray-500" />
          <p className="pl-4">회비를 납부해주세요.</p>
        </div>
      )}

      <h4 className="font-semibold text-lg">납부 방법</h4>
      <HowtoDo />
      <NavigationButtons
        prev={onPrev}
        next={handleNext}
        isValid={isValid}
        showPrev={isValid}
      />
    </div>
  );
}

export default Payment;
