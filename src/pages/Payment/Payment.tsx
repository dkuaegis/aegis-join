import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Complete from "@/components/ui/custom/complete";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import type { GetPaymentInfo } from "@/types/api/payment";
import AdminInfoDrawer from "./Payment.AdminInfoDrawer";
import PaymentAmount from "./Payment.Amount";
import { startPaymentPolling } from "./Payment.Api";
// import HowtoDo from "./Payment.HowtoDo";
import Information from "./Payment.Information";

const Payment = () => {
  const [isValid, setIsValid] = useState(false);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [payInfo, setPayInfo] = useState<GetPaymentInfo | null>(null);

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
    <div className="line-breaks space-y-8">
      {!isValid ? (
        <>
          <PaymentAmount amount={remainingAmount} />
          <Information />
        </>
      ) : (
        <Complete message="납부가 완료됐어요" />
      )}
      <Button size="lg" className=" w-full items-center" variant="default">
        쿠폰 적용하기
      </Button>
      <AdminInfoDrawer />

      <NavigationButtons isValid={isValid} />
    </div>
  );
};

export default Payment;
