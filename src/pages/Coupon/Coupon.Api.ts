import { httpClient } from "@/api/api";
import type { Coupon } from "./Coupon.Types";

export const fetchCoupon = async (): Promise<Coupon[]> => {
  return httpClient.get<Coupon[]>("/coupons/issued/me");
};

export const submitCoupon = async (selectedCoupons: number[]) => {
  const payload = { issuedCouponIds: selectedCoupons };

  return httpClient.put("/payments", payload);
};

export const submitAndFetchCouponCode = async (couponCode: string): Promise<Coupon[]> => {
  const payload = { code: couponCode };

  await httpClient.post("/coupons/code", payload);

  return fetchCoupon();
};
