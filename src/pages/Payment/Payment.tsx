import { CircleAlert, CircleCheckBig, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import AlertBox from "@/components/ui/custom/alertbox";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import type { GetPaymentInfo } from "@/types/api/payment";
import { startPaymentPolling } from "./Payment.Api";
import { ADMIN_INFO } from "./Payment.Config";
// import HowtoDo from "./Payment.HowtoDo";
import Information from "./Payment.Information";
import Complete from "@/components/ui/custom/complete";
import PaymentAmount from "./Payment.Amount";
import { Button } from "@/components/ui/button";
import AdminInfoDrawer from "./Payment.AdminInfoDrawer";

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
        <Complete
          message="납부가 완료됐어요"
        />
      )}
      <Button
        size="lg"
        className=" w-full items-center"
        variant="default"
      >
        쿠폰 적용하기
      </Button>
      <AdminInfoDrawer />


      <NavigationButtons isValid={isValid} />
    </div>
  );
};

export default Payment;
