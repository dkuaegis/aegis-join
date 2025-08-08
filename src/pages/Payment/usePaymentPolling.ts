import { useState, useEffect, useRef } from "react";
import { makePayment, pollPaymentStatus } from "@/pages/Payment/Payment.Api";
import { ServerError } from "@/api/types";

type PaymentStatus = "loading" | "polling" | "success" | "error";

export const usePaymentPolling = () => {
  const [status, setStatus] = useState<PaymentStatus>("loading");
  const [finalPrice, setFinalPrice] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const poll = async () => {
      try {
        const result = await pollPaymentStatus();
        setFinalPrice(result.finalPrice);

        if (result.status === "COMPLETED") {
          setStatus("success");

          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
        }
      } catch (err) {
        console.error("재시도 필요. Payment polling failed:", err);
        setStatus("error");
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    };

    // 결제 생성 및 폴링 시작 로직
    const initializePayment = async () => {
      try {
        await makePayment([]); 
        console.log("폴링을 시작합니다.");
        setStatus("polling");
        poll(); 
        intervalRef.current = setInterval(poll, 5000);
      } catch (error) {
        // 409 에러는 이미 결제가 생성된 경우이므로, 정상적으로 폴링을 시작합니다.
        if (error instanceof ServerError && error.status === 409) {
          console.log("이미 진행 중인 결제가 있어 폴링을 재개합니다.");
          setStatus("polling");
          poll(); 
          intervalRef.current = setInterval(poll, 5000);
        } else {
          console.error("결제 생성에 실패했습니다:", error);
          setStatus("error");
        }
      }
    };

    initializePayment();

    return () => {
      if (intervalRef.current) {
        console.log("폴링을 중단합니다.");
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const isValid = status === "success";

  return { isValid, finalPrice, status };
};