import CouponItem from "./Coupon.CouponItem";
import { CouponListProps } from "./Coupon.Types";


export function CouponList({coupons, selectedCoupons, setSelectedCoupons}: CouponListProps) {

    const handleCouponSelect = (id: string) => {
        setSelectedCoupons((prev) => {
          if (prev.includes(id)) {
            return prev.filter((couponID) => couponID !== id)
          }
          return [...prev, id];
        })
      };

    return (
        <div className="space-y-3 p-4">
            {coupons.map((coupon) => (
                <CouponItem 
                    key={coupon.id}
                    coupon={coupon}
                    isSelected={selectedCoupons.includes(coupon.id)}
                    setSelect={handleCouponSelect}
                />
            ))}
        </div>
    )
}