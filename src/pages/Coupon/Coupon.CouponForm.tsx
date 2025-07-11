import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CouponFormProps {
  couponCode: string;
  setCouponCode: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const CouponForm: React.FC<CouponFormProps> = React.memo(
  ({ couponCode, setCouponCode, handleSubmit }) => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="couponCode">쿠폰 코드</Label>
        <Input
          id="couponCode"
          placeholder="쿠폰 코드를 입력하세요"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        등록하기
      </Button>
    </form>
  )
);

CouponForm.displayName = "CouponForm";
export default CouponForm;
