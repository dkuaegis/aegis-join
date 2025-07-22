import { TicketPercent } from "lucide-react"; // 아이콘 라이브러리에서 아이콘 가져오기
import type { CouponItemProps } from "./Coupon.Types";
import ToggleCardWrapper from "@/components/ui/custom/toggle-card-wrapper";

const CouponItem = ({
  coupon,
  isSelected,
  setSelect,
  className,
  ...props
}: CouponItemProps) => {
  return (
    <ToggleCardWrapper
      isSelected={isSelected}
      onClick={() => setSelect(coupon.issuedCouponId)}
      className="w-full"
      {...props}
    >
      <div className="flex w-full items-center justify-start space-x-4">
        <div className="flex-shrink-0 text-red-500">
          <TicketPercent className="h-10 w-10" />
        </div>

        <div className="flex flex-col items-start space-y-1">
          <span className="text-2xl font-bold text-gray-800">
            {coupon.discountAmount.toLocaleString()}원 할인
          </span>
          <span className="text-sm text-muted-foreground">
            {coupon.couponName}
          </span>

        </div>
      </div>
    </ToggleCardWrapper>
  );
};

export default CouponItem;