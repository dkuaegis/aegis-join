import { httpClient } from "@/api/api";
import { Analytics } from "@/service/analytics";

export const makePayment = async (selectedCoupons: number[]) => {
  const payload = { issuedCouponIds: selectedCoupons };
  try {
    Analytics.safeTrack("Payment_Create_Start", {
      category: "Payment",
      coupon_count: selectedCoupons.length,
    });
    const res = await httpClient.post("/payments", payload);
    Analytics.safeTrack("Payment_Create_Success", { category: "Payment" });
    return res;
  } catch (err) {
    Analytics.safeTrack("Payment_Create_Failed", {
      category: "Payment",
      error_message: err instanceof Error ? err.message : String(err ?? ""),
    });
    throw err;
  }
};

interface PaymentPollingResult {
  status: string;
  finalPrice: number;
}

export const pollPaymentStatus = async (): Promise<PaymentPollingResult> => {
  try {
    const res = await httpClient.get<PaymentPollingResult>("/payments/status");
    Analytics.safeTrack("Payment_Poll_Tick", {
      category: "Payment",
      status: res.status,
      final_price: res.finalPrice,
    });
    return res;
  } catch (err) {
    Analytics.safeTrack("Payment_Poll_Failed", {
      category: "Payment",
      error_message: err instanceof Error ? err.message : String(err ?? ""),
    });
    throw err;
  }
};
