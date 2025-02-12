import { CouponItemProps } from "./Coupon.Types";
import { cn } from "@/lib/utils"



const CouponItem = ({coupon, isSelected, setSelect, className, ...props}: CouponItemProps)  => {
    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => setSelect(coupon.id)}
            className={cn(
                "rounded-2xl bg-gray-50 p-4 transition-all duration-200 ease-linear",
                "hover:bg-gray-100 outline-none",
                isSelected && "bg-gray-200 ring-2 ring-primary",
                className,
              )}
              {...props}
        >
            <div className="space-y-1">
                <p className="text-2xl font-bold">{coupon.amount.toLocaleString()}원</p>
                <p className="text-sm text-muted-foreground">{coupon.description}</p>
            </div>

        </div>
    )
}







export default CouponItem;