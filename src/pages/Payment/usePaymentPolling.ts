import { useEffect, useRef, useState } from "react";
import { ServerError } from "@/api/types";
import { makePayment, pollPaymentStatus } from "@/pages/Payment/Payment.Api";
import { Analytics } from "@/service/analytics";

type PaymentStatus = "loading" | "polling" | "success" | "error";

export const usePaymentPolling = () => {
  const [status, setStatus] = useState<PaymentStatus>("loading");
  const [finalPrice, setFinalPrice] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inFlightRef = useRef(false);

  const pollingCountRef = useRef(0);

  useEffect(() => {
    let isMounted = true;

    const poll = async () => {
      if (inFlightRef.current) {
        return;
      }

      inFlightRef.current = true;

      pollingCountRef.current += 1;

      try {
        const result = await pollPaymentStatus();
        setFinalPrice(result.finalPrice);

        if (result.status === "COMPLETED") {
          setStatus("success");

          Analytics.safeTrack("payment_polling_success", {
            category: "Payment",
            count: pollingCountRef.current,
          });

          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      } catch (err) {
        console.error("재시도 필요. Payment polling failed:", err);
        setStatus("error");

        Analytics.safeTrack("payment_polling_error", {
          category: "Payment",
          count: pollingCountRef.current,
          error_message: err instanceof Error ? err.message : String(err),
        });

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } finally {
        inFlightRef.current = false;
      }
    };

    const startPolling = () => {
      if (isMounted) {
        setStatus("polling");
        poll();
        intervalRef.current = setInterval(poll, 5000);
      }
    };

    // 결제 생성 및 폴링 시작 로직
    const initializePayment = async () => {
      try {
        await makePayment([]);

        startPolling();
      } catch (error) {
        // 409 에러는 이미 결제가 생성된 경우이므로, 정상적으로 폴링을 시작합니다.
        if (error instanceof ServerError && error.status === 409) {
          startPolling();
        } else {
          console.error("결제 생성에 실패했습니다:", error);
          setStatus("error");
        }
      }
    };

    initializePayment();

    return () => {
      isMounted = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;

        // 4. 컴포넌트 이탈로 폴링이 중단될 때 트래킹 이벤트를 전송합니다.
        Analytics.safeTrack("payment_polling_aborted", {
          category: "Payment",
          count: pollingCountRef.current,
        });
      }
    };
  }, []);

  const isValid = status === "success";

  return { isValid, finalPrice, status };
};
