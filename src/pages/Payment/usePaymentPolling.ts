import { useCallback, useEffect, useRef, useState } from "react";
import { httpClient } from "@/api/api";
import { Analytics } from "@/service/analytics";

type PaymentStatus = "loading" | "polling" | "success" | "error";

interface PaymentResponse {
  status: string;
  finalPrice: number;
}

export const usePaymentPolling = () => {
  const [status, setStatus] = useState<PaymentStatus>("loading");
  const [finalPrice, setFinalPrice] = useState<number>(0);

  const timeoutRef = useRef<number | null>(null);
  const inFlightRef = useRef(false);
  const isMountedRef = useRef(true);

  const POLL_INTERVAL = 5000;

  const safeSetStatus = useCallback((newStatus: PaymentStatus) => {
    if (isMountedRef.current) {
      setStatus(newStatus);
    }
  }, []);

  const safeSetFinalPrice = useCallback((price: number) => {
    if (isMountedRef.current) {
      setFinalPrice(price);
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    const poll = async (): Promise<boolean> => {
      if (inFlightRef.current) return false;
      inFlightRef.current = true;

      try {
        const payload =
          await httpClient.get<PaymentResponse>("/payment/status");

        // finalPrice가 전달되면 업데이트
        if (typeof payload.finalPrice === "number") {
          safeSetFinalPrice(payload.finalPrice);
        }

        const success = payload.status === "COMPLETED";
        if (success) {
          safeSetStatus("success");
          if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          Analytics.trackEvent("Payment_Poll_Success", {
            category: "Payment",
            is_success: true,
          });
          return true;
        }

        return false;
      } catch (err) {
        console.error("결제 폴링 에러:", err);
        Analytics.trackEvent("Payment_Poll_Failed", {
          category: "Payment",
          error_message: err instanceof Error ? err.message : String(err ?? ""),
        });
        safeSetStatus("error");

        return false;
      } finally {
        inFlightRef.current = false;
      }
    };

    const scheduleNext = () => {
      if (!isMountedRef.current) return;

      timeoutRef.current = window.setTimeout(async () => {
        const isSuccess = await poll();
        if (!isSuccess && isMountedRef.current) {
          // 로딩 후에는 항상 'polling' 상태로 변경
          safeSetStatus("polling");
          scheduleNext();
        }
      }, POLL_INTERVAL);
    };

    // 첫 호출
    (async () => {
      const isSuccess = await poll();
      if (!isSuccess) {
        safeSetStatus("polling");
        scheduleNext();
      }
    })();

    // 클린업 함수
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
    // 5. useCallback으로 만든 함수들을 의존성 배열에 추가
  }, [safeSetStatus, safeSetFinalPrice]);

  const isValid = status === "success";
  return { isValid, finalPrice, status };
};
