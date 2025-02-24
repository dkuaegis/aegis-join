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

  return response.headers.get("content-length") !== "0" ? await response.json() : null;
};

export const submitAndFetchCouponCode = async (couponCode: string) => {
  const payload = { code: couponCode };

  const postResponse = await fetchingWithToast(`${import.meta.env.VITE_API_URL}/coupons/code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if(!postResponse.ok) {
    throw new Error("쿠폰 코드 제출에 실패했습니다.");
  }
  const getResponse = fetchCoupon();

  return getResponse;
};
