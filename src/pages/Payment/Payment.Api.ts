import { httpClient } from "@/api/api";

export const makePayment = async (selectedCoupons: number[]) => {
  const payload = { issuedCouponIds: selectedCoupons };

  return httpClient.post("/payments", payload);
};

interface PaymentPollingResult {
  status: string;
  finalPrice: number;
}

export const pollPaymentStatus = async (): Promise<PaymentPollingResult> => {
  return httpClient.get<PaymentPollingResult>("/payments/status");
};

export const startPaymentPolling = (
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
  setFinalPrice: React.Dispatch<React.SetStateAction<number>>
) => {
  let pollingActive = true;
  const interval = 5000;

  const pollPaymentStatusInterval = async () => {
    try {
      const result = await pollPaymentStatus();
      if (!pollingActive) return;

      setIsValid(result.status === "COMPLETED");
      setFinalPrice(result.finalPrice);

      if (result.status === "COMPLETED") {
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
