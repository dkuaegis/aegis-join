import type { Coupon, TotalAmountProps } from "./Coupon.Types";

const CLUB_DUES = 15000;

const totalAmount = (coupons: Coupon[], selectedCoupons: number[]) =>
  coupons.reduce((sum, coupon) => {
    if (selectedCoupons.includes(coupon.issuedCouponId)) {
      return sum + coupon.discountAmount;
    }
    return sum;
  }, 0);

export const TotalAmount = ({ coupons, selectedCoupons }: TotalAmountProps) => {
  const total = totalAmount(coupons, selectedCoupons);
  const finalDues = CLUB_DUES - total;

  return (
    <div className="mt-2 p-2 text-center">
      <p
        className="font-bold text-2xl"
      >
        회비: {Math.max(finalDues,0).toLocaleString()}원
      </p>
    </div>
  );
};
