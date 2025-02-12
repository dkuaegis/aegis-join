import type * as React from "react"

export interface Coupon {
  id: string
  amount: number
  description: string
}

export interface CouponItemProps extends React.HTMLAttributes<HTMLDivElement> {
  coupon: Coupon
  isSelected: boolean
  setSelect: (id: string) => void
}

export interface CouponListProps {
  coupons: Coupon[]
  selectedCoupons: string[]
  setSelectedCoupons: (value: React.SetStateAction<string[]>) => void
}

export interface TotalAmountProps {
coupons: Coupon[]
selectedCoupons: string[]
}
