import { cn } from "@/lib/utils";
import type { CouponItemProps } from "./Coupon.Types";

const CouponItem = ({
  coupon,
  isSelected,
  setSelect,
  className,
  ...props
}: CouponItemProps) => {
  return (
    <button
      tabIndex={0}
      onClick={() => setSelect(coupon.issuedCouponId)}
      className={cn(
        "block w-full appearance-none rounded-2xl bg-gray-50 p-4 pl-6 text-left transition-all duration-200 ease-linear",
        "outline-none hover:bg-gray-100",
        isSelected && "bg-gray-200 ring-2 ring-primary",
        className
      )}
      {...props}
    >
      <div className="space-y-1">
        <p className="font-bold text-2xl">
          {coupon.discountAmount.toLocaleString()}원
        </p>
        <p className="text-muted-foreground text-sm">{coupon.couponName}</p>
      </div>
    </button>
  );
};

export default CouponItem;
