import type { Coupon } from "./Coupon.Types";

export const fetchCoupon = async (): Promise<Coupon[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/coupon`);
  if (!response.ok) {
    throw new Error("fetch error: COUPON");
  }

  return response.json();
};

export const submitCoupon = async (selectedCoupons: string[]) => {
  const payload = selectedCoupons;

  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/payments`, {
    // credentials: "include",
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
