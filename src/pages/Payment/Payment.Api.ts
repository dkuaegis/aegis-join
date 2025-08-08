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