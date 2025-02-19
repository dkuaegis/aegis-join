import { useEffect, useState } from "react";
import NavigationButtons from "../../components/ui/custom/navigationButton";
import { fetchCoupon, submitCoupon } from "./Coupon.Api";
import { CouponList } from "./Coupon.CouponList";
import { TotalAmount } from "./Coupon.TotalAmount";
import type { Coupon as CouponType } from "./Coupon.Types";
import AlertBox from "@/components/ui/custom/alertbox";
import { CircleAlert } from "lucide-react";

export default function Coupon({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const [selectedCoupons, setSelectedCoupons] = useState<number[]>([]);

  useEffect(() => {
    fetchCoupon()
      .then((data) => {
        setCoupons(data);
      })
      .catch((error) => {
        console.log("please error", error);
      });
  }, []);

  const onSubmit = () => {
    submitCoupon(selectedCoupons);
    console.log("쿠폰 제출",selectedCoupons);
    onNext();
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">쿠폰을 선택해주세요 !</h3>
      {coupons.length === 0 ? (
        <AlertBox
        icon={<CircleAlert className="h-4 w-4" />}
        title="쿠폰이 없습니다."
        description={[
          "다음 버튼을 눌러주세요.",
        ]}
      />) :(
      <div>
        <CouponList
          coupons={coupons}
          selectedCoupons={selectedCoupons}
          setSelectedCoupons={setSelectedCoupons}
        />
        <TotalAmount coupons={coupons} selectedCoupons={selectedCoupons} />
      </div>)}
        <NavigationButtons prev={onPrev} next={onSubmit} isValid={true} />
    </div>
  );
}