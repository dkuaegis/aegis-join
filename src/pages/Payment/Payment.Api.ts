import type { GetPaymentInfo } from "@/types/api/payment";

interface PaymentPollingResult {
  isSuccess: boolean;
  paymentInfo?: GetPaymentInfo;
}

export const pollPaymentStatus = async (): Promise<PaymentPollingResult> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/payments/status`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error(`ERROR on polling: ${response.status}`);
    }

    const data: GetPaymentInfo = await response.json();

    return {
      isSuccess: ["COMPLETE", "OVERPAID"].includes(data.status),
      paymentInfo: data,
    };
  } catch (err) {
    console.error("송금 폴링 중 오류 발생:", err);
    throw err;
  }
};

export const startPaymentPolling = (
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
  setPayInfo: React.Dispatch<React.SetStateAction<GetPaymentInfo | null>>,
  setRemainingAmount: React.Dispatch<React.SetStateAction<number>>
) => {
  let pollingActive = true;
  const interval = 2000;

  const pollPaymentStatusInterval = async () => {
    try {
      const result = await pollPaymentStatus();
      if (!pollingActive) return;

      setIsValid(result.isSuccess);
      setPayInfo(result.paymentInfo ?? null);

      if (result.paymentInfo) {
        const remainingAmount =
          result.paymentInfo.expectedDepositAmount -
          result.paymentInfo.currentDepositAmount;
        setRemainingAmount(remainingAmount);
      }

      if (
        result.paymentInfo &&
        ["COMPLETE", "OVERPAID"].includes(result.paymentInfo.status)
      ) {
        pollingActive = false;
        clearInterval(pollingInterval);
      }
    } catch (error) {
      console.error("Payment polling failed:", error);
    }
  };

  const pollingInterval = setInterval(pollPaymentStatusInterval, interval);
  pollPaymentStatusInterval();

  return () => {
    pollingActive = false;
    clearInterval(pollingInterval);
  };
};
