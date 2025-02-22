import fetchingWithToast from "@/lib/customFetch";
import type { Coupon } from "./Coupon.Types";

export const fetchCoupon = async (): Promise<Coupon[]> => {
  const response = await fetchingWithToast(
    `${import.meta.env.VITE_API_URL}/coupons/issued/me`
  );
  if (!response.ok) {
    throw new Error("fetch error: COUPON");
  }

  return response.json();
};

export const submitCoupon = async (selectedCoupons: number[]) => {
  const payload = { issuedCouponIds: selectedCoupons };

  const response = await fetchingWithToast(
    `${import.meta.env.VITE_API_URL}/payments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  if (!response.ok) {
    throw new Error("Error at submit COUPON !");
  }
  return response.json();
};

export const submitCouponCode = async (couponCode: number) => {
  const payload = couponCode;

  const response = await fetchingWithToast(
    `${import.meta.env.VITE_API_URL}/payments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );
  if (!response.ok) {
    throw new Error("Error at submit COUPON !");
  }
  return response.json();
};
