import { ArrowLeftIcon, CircleAlert } from "lucide-react";
import { MouseEventHandler, useEffect, useState } from "react";
import AlertBox from "@/components/ui/custom/alertbox";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import { Label } from "@/components/ui/label";
import { fetchCoupon, submitCoupon } from "./Coupon.Api";
import { CouponList } from "./Coupon.CouponList";
import InputCouponCode from "./Coupon.InputCouponCode";
import { TotalAmount } from "./Coupon.TotalAmount";
import type { Coupon, Coupon as CouponType } from "./Coupon.Types";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/button";
import { JOIN_STEP_KOREAN_MAP } from "@/constants/joinSteps";

interface CouponProps {
  onClose: () => void;
}

const Coupon = ({ onClose } : CouponProps) => {
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

  const onSubmit = async (): Promise<boolean> => {
    try {
      await submitCoupon(selectedCoupons);
      return true;
    } catch (error: unknown) {
      console.error("제출 중 오류 발생:", error);
      return false;
    }
  };

  return (
    <div className="space-y-8">
      <header className="absolute top-8 bg-white">
        <Stack>
          <Button variant="icon" aria-label="Go back" onClick={onClose}>
            <ArrowLeftIcon size={28} />
          </Button>
          <h1 className="font-bold text-2xl">
            쿠폰 적용
          </h1>
        </Stack>
      </header>
      
      <div>
        <Label className="text-xl">할인 금액</Label>
        <TotalAmount coupons={coupons} selectedCoupons={selectedCoupons} />
      </div>
      <InputCouponCode setCoupons={setCoupons} />
      <div className="border-t py-4">
        {coupons.length === 0 ? (
          <AlertBox
            icon={<CircleAlert className="h-4 w-4" />}
            title="쿠폰이 없습니다"
            description={["쿠폰을 등록하거나, 결제 페이지로 이동해주세요"]}
          />
        ) : (
          <CouponList
            coupons={coupons}
            selectedCoupons={selectedCoupons}
            setSelectedCoupons={setSelectedCoupons}
          />
        )}
      </div>

      <NavigationButtons
        isValid={true}
        text="쿠폰 적용하기"
        onFetch={onSubmit}
      />
    </div>
  );
};

export default Coupon;
