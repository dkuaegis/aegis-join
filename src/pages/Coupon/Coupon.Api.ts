import type { Coupon } from "./Coupon.Types";

export const fetchCoupon = async (): Promise<Coupon[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/coupons/issued/me`,{
    credentials: "include"
  });
  if (!response.ok) {
    throw new Error("fetch error: COUPON");
  }

  return response.json();
};

export const submitCoupon = async (selectedCoupons: number[]) => {
  const payload = selectedCoupons;

  const response = await fetch(`${import.meta.env.VITE_API_URL}/payments`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("Error at submit COUPON !");
  }
  return response.json();
};
