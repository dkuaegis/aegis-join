import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import type { GetPaymentInfo } from "@/types/api/payment";
import AdminInfoDrawer from "./Payment.AdminInfoDrawer";
import PaymentAmount from "./Payment.Amount";
import { startPaymentPolling } from "./Payment.Api";
import Information from "./Payment.Information";
import { cn } from "@/lib/utils";
import Coupon from "../Coupon/Coupon";
import { Label } from "@radix-ui/react-label";

const Complete = React.lazy(() => import("@/components/ui/custom/complete"));


const Payment = () => {
  const [isValid, setIsValid] = useState(false);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [payInfo, setPayInfo] = useState<GetPaymentInfo | null>(null);
  const [currentView, setCurrentView] = useState<'coupon' | 'payment'>('payment');

  useEffect(() => {
    const cleanupPolling = startPaymentPolling(
      setIsValid,
      setPayInfo,
      setRemainingAmount
    );

    return () => {
      cleanupPolling();
    };
  }, []);

  useEffect(() => {
    if (payInfo) {
      setRemainingAmount(
        payInfo.expectedDepositAmount - payInfo.currentDepositAmount
      );
    }
  }, [payInfo]);

  return (
    <>
      <div className={cn("line-breaks space-y-8", currentView === 'payment' ? '' : 'hidden')} >
        {!isValid ? (
          <>
             <Label className="text-xl">납부 금액</Label>
            <PaymentAmount amount={remainingAmount} />
            <Information />
          </>
        ) : (
          <Suspense>
            <Complete message="납부가 완료됐어요" />
          </Suspense>
        )}
        <Button size="lg" className=" w-full items-center" variant="default" onClick={() => setCurrentView('coupon')}>
          쿠폰 적용하기
        </Button>
        <AdminInfoDrawer />

        <NavigationButtons isValid={isValid} />
      </div>
      <div className={cn("line-breaks space-y-8", currentView === 'coupon' ? '' : 'hidden')} >
        <Coupon onClose={() => setCurrentView('payment')}/>
      </div>
    </>
  );
};

export default Payment;
