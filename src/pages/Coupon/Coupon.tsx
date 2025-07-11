import { CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import AlertBox from "@/components/ui/custom/alertbox";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import { fetchCoupon, submitCoupon } from "./Coupon.Api";
import { CouponList } from "./Coupon.CouponList";
import InputCouponCode from "./Coupon.InputCouponCode";
import { TotalAmount } from "./Coupon.TotalAmount";
import type { Coupon as CouponType } from "./Coupon.Types";

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
    const fetchData = async () => {
      try {
        const data = await fetchCoupon();
        setCoupons(data);
      } catch (error) {
        console.error("쿠폰 불러오는데 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async () => {
    try {
      await submitCoupon(selectedCoupons);
      onNext();
    } catch (error: unknown) {
      console.error("제출 중 오류 발생:", error);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">쿠폰 선택</h3>
      <div>
        {coupons.length === 0 ? (
          <AlertBox
            icon={<CircleAlert className="h-4 w-4" />}
            title="쿠폰이 없습니다."
            description={["등록할 쿠폰이 없으면 '다음' 버튼을 눌러주세요."]}
          />
        ) : (
          <CouponList
            coupons={coupons}
            selectedCoupons={selectedCoupons}
            setSelectedCoupons={setSelectedCoupons}
          />
        )}
      </div>
      <TotalAmount coupons={coupons} selectedCoupons={selectedCoupons} />
      <InputCouponCode setCoupons={setCoupons} />
      <NavigationButtons prev={onPrev} next={onSubmit} isValid={true} />
    </div>
  );
}
