import { CouponItemProps } from "./Coupon.Types";
import { cn } from "@/lib/utils"



const CouponItem = ({coupon, isSelected, setSelect, className, ...props}: CouponItemProps)  => {

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => setSelect(coupon.id)}
            className={cn(
                "relative rounded-2xl bg-gray-50 p-4 transition-all duration-200 ease-in-out",
                "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                isSelected && "bg-primary/10 ring-2 ring-primary",
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