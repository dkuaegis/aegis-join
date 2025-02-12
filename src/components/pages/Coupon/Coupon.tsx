
import { LoadingState } from "@/types/state/loading";
import type { Coupon } from "./Coupon.Types"
import { useEffect, useState } from "react";
import NavigationButtons from "../../ui/custom/navigationButton";
import { fetchCoupon } from "./Coupon.Api";
import { CouponList } from "./Coupon.CouponList";

export default function Coupon({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [selectedCoupons, setSelectedCoupons] = useState<string[]>([]);
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);

  useEffect(() => {
    fetchCoupon()
      .then((data) => {
        setCoupons(data);
      })
      .catch((error) => {
        console.log("please error", error);
      });
  })

  const totalAmount = coupons.reduce((sum, coupon) => {
    if(selectedCoupons.includes(coupon.id)) {
      return sum + coupon.amount;
    }
    return sum;
  }, 0);


  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">쿠폰을 선택해주세요 !</h3>
      <CouponList 
        coupons={coupons}
        selectedCoupons={selectedCoupons}
        setSelectedCoupons={setSelectedCoupons}
      />
            {selectedCoupons.length > 0 && (
        <div className="mt-4 p-4 text-center">
          <p className="text-lg font-semibold">선택된 쿠폰 금액: {totalAmount.toLocaleString()}원</p>
        </div>
      )}
      <p className="items-center text-2xl">{CouponMessage(loading)}</p>
      <NavigationButtons prev={onPrev} next={onNext} />
    </div>
  );
}

const CouponMessage = (loading: LoadingState) => {
  switch (loading) {
    case LoadingState.SUCCESS:
      return "쿠폰이 적용되었습니다!";
    case LoadingState.ERROR:
      return "쿠폰 적용이 실패하였습니다.";
    default:
      return null;
  }
};
