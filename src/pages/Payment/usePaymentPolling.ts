import { useEffect, useRef, useState } from "react";
import { httpClient } from "@/api/api";
import { Analytics } from "@/service/analytics";

type PaymentStatus = "loading" | "polling" | "success" | "error";

interface PaymentResponse {
  isPaid: boolean;
  finalPrice?: number;
  // 서버가 반환하는 실제 필드에 맞게 확장하세요.
}

export const usePaymentPolling = () => {
  const [status, setStatus] = useState<PaymentStatus>("loading");
  const [finalPrice, setFinalPrice] = useState<number>(0);

  const timeoutRef = useRef<number | null>(null);
  const inFlightRef = useRef(false);
  const isMountedRef = useRef(true);

  const POLL_INTERVAL = 5000;

  useEffect(() => {
    isMountedRef.current = true;

    const safePayload = (resp: any): PaymentResponse => (resp && resp.data) || resp || {};

    const poll = async (): Promise<boolean> => {
      if (inFlightRef.current) return false;
      inFlightRef.current = true;

      try {
        // API 경로는 실제 엔드포인트로 조정하세요.
        const resp = await httpClient.get<PaymentResponse>("/payment/status");
        const payload = safePayload(resp);

        // finalPrice가 전달되면 업데이트
        if (typeof payload.finalPrice === "number" && isMountedRef.current) {
          setFinalPrice(payload.finalPrice);
        }

        const success = Boolean(payload.isPaid);
        if (success) {
          if (isMountedRef.current) setStatus("success");
          // 성공 시 재시도 타이머 정리
          if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          Analytics.trackEvent("Payment_Poll_Success", { category: "Payment", is_success: true });
          return true;
        }

        return false;
      } catch (err) {
        console.error("결제 폴링 에러:", err);
        Analytics.trackEvent("Payment_Poll_Failed", {
          category: "Payment",
          error_message: err instanceof Error ? err.message : String(err ?? ""),
        });
        if (isMountedRef.current) setStatus("error");
        // 실패시 재시도는 멈추게 할지 계속할지 정책에 따르세요. 여기선 멈추도록 함.
        return false;
      } finally {
        inFlightRef.current = false;
      }
    };

    // 재귀적 setTimeout으로 중복 호출 방지 및 네트워크 지연 안전화
    const scheduleNext = (delay = POLL_INTERVAL) => {
      if (!isMountedRef.current) return;
      timeoutRef.current = window.setTimeout(async () => {
        const ok = await poll();
        if (!ok && isMountedRef.current) {
          setStatus((s) => (s === "loading" ? "polling" : s));
          scheduleNext();
        }
      }, delay);
    };

    // 첫 호출
    (async () => {
      const firstOk = await poll();
      if (!firstOk) {
        if (isMountedRef.current) setStatus("polling");
        scheduleNext();
      }
    })();

    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const isValid = status === "success";
  return { isValid, finalPrice, status };
};
