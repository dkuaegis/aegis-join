import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import AlertBox from "@/components/ui/custom/alertbox";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import { Label } from "@/components/ui/label";
import { fetchCoupon, submitCoupon } from "./Coupon.Api";
import { CouponList } from "./Coupon.CouponList";
import InputCouponCode from "./Coupon.InputCouponCode";
import { TotalAmount } from "./Coupon.TotalAmount";
import type { Coupon as CouponType } from "./Coupon.Types";

interface CouponProps {
  onClose: () => void;
}


export const mockCoupons: CouponType[] = [
  {
    issuedCouponId: 1,
    discountAmount: 1000,
    couponName: '신규 가입 환영 쿠폰',
  },
  {
    issuedCouponId: 2,
    discountAmount: 5000,
    couponName: '여름맞이 5천원 할인 쿠폰',
  },
  {
    issuedCouponId: 3,
    discountAmount: 3000,
    couponName: '배송비 지원 쿠폰',
  },
  {
    issuedCouponId: 4,
    discountAmount: 10000,
    couponName: '10만원 이상 구매 시 1만원 할인',
  },
  {
    issuedCouponId: 5,
    discountAmount: 2000,
    couponName: '재구매 감사 쿠폰',
  },
  {
    issuedCouponId: 6,
    discountAmount: 7000,
    couponName: 'VIP 고객 전용 특별 할인',
  },
];

const buttonWrapperVariants = {
  // 초기 상태: 화면 아래에 숨겨져 있음
  initial: {
    opacity: 0,
  },
  // 보이는 상태: 제자리로 올라옴
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      // 부모 애니메이션이 끝날 즈음 시작되도록 약간의 딜레이를 줍니다.
      delay: 0.3,
    },
  },
  // 사라지는 상태: 다시 화면 아래로 내려감
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
} as const;

const Coupon = ({ onClose }: CouponProps) => {
  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const [selectedCoupons, setSelectedCoupons] = useState<number[]>([]);
  const [isExiting, setIsExiting] = useState<boolean>(false);

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

  const handleSubmit = async () => {
    setIsExiting(true);
    try {
      await submitCoupon(selectedCoupons);
    } catch (error: unknown) {
      console.error("제출 중 오류 발생:", error);
    } finally {
      onClose();
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-slate-50 p-6 rounded-2xl space-y-5">
        <div>
          <Label className="text-xl">할인 금액</Label>
          <TotalAmount coupons={coupons} selectedCoupons={selectedCoupons} />
        </div>
        <InputCouponCode setCoupons={setCoupons} />
      </div>

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
      <AnimatePresence onExitComplete={onClose}>
        {!isExiting && (
          <motion.div
            variants={buttonWrapperVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <NavigationButtons
              disabled={false}
              text="쿠폰 적용하기"
              onClick={handleSubmit}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Coupon;
