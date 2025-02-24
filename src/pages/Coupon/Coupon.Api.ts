import fetchingWithToast from "@/lib/customFetch";
import type { Coupon } from "./Coupon.Types";

export const fetchCoupon = async (): Promise<Coupon[]> => {

  const response = await fetchingWithToast(
    `${import.meta.env.VITE_API_URL}/coupons/issued/me`
  );

  return await response.json();
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

  return await response.json();

};

export const submitAndFetchCouponCode = async (couponCode: string) => {

  const payload = { code: couponCode };

  await fetchingWithToast(
    `${import.meta.env.VITE_API_URL}/coupons/code`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const getResponse = fetchCoupon();

  return getResponse;
};
