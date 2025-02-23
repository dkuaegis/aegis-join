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

export const submitAndFetchCouponCode = async (couponCode: string) => {
  try {
    const payload = { code: couponCode };

    const postResponse = await fetchingWithToast(
      `${import.meta.env.VITE_API_URL}/coupons/code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    if (!postResponse.ok) {
      throw new Error("Error at submit COUPON CODE !");
    }

    const getResponse = await fetchingWithToast(
      `${import.meta.env.VITE_API_URL}/coupons/issued/me`
    );

    if (!getResponse.ok) {
      throw new Error("Error at fetch COUPONS !");
    }

    const result = await getResponse.json();
    return result;
  } catch (error: unknown) {
    console.log("에러 발생", error);
    throw error;
  }
};
