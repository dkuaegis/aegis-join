import { Label } from "@radix-ui/react-label";
import { AnimatePresence, motion } from "framer-motion";
import React, { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import { cn } from "@/lib/utils";
import type { GetPaymentInfo } from "@/types/api/payment";
import Coupon from "../Coupon/Coupon";
import AdminInfoDrawer from "./Payment.AdminInfoDrawer";
import PaymentAmount from "./Payment.Amount";
import { startPaymentPolling } from "./Payment.Api";
import Information from "./Payment.Information";

const Complete = React.lazy(() => import("@/components/ui/custom/complete"));

const modalVariants = {
  // 초기 상태 (화면 아래, 숨김)
  hidden: {
    y: "60%",
    opacity: 0,
  },
  // 보이는 상태
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      // 자식 요소들의 애니메이션을 부모보다 0.2초 늦게 시작
      staggerChildren: 0,
      when: "beforeChildren", // 이 속성은 자식보다 부모 애니메이션을 먼저 시작하도록 보장
    },
  },
  // 사라지는 상태
  exit: {
    y: "60%",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
} as const;

const Payment = () => {
  const [isValid, setIsValid] = useState(false);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [payInfo, setPayInfo] = useState<GetPaymentInfo | null>(null);
  const [currentView, setCurrentView] = useState<"coupon" | "payment">(
    "payment"
  );

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
    <div className="relative h-full w-full">
      <div className={cn("line-breaks space-y-8")}>
        {!isValid ? (
          <>
            <Label className="text-xl">납부 금액</Label>
            <PaymentAmount amount={remainingAmount} />
            <Information />
            <Button
              size="lg"
              className=" w-full items-center"
              variant="default"
              onClick={() => setCurrentView("coupon")}
            >
              쿠폰 적용하기
            </Button>
            <AdminInfoDrawer />
          </>
        ) : (
          <Suspense>
            <Complete message="납부가 완료됐어요" />
            <NavigationButtons isValid={isValid} />
          </Suspense>
        )}
      </div>
      <AnimatePresence>
        {currentView === "coupon" && (
          <motion.div
            className="absolute top-0 left-0 z-10 h-full w-full bg-white"
            variants={modalVariants} // variants 속성 사용
            initial="hidden" // "hidden"이라는 이름의 variant를 초기 상태로
            animate="visible" // "visible"이라는 이름의 variant를 애니메이션 상태로
            exit="exit" // "exit"라는 이름의 variant를 종료 상태로
          >
            <Coupon onClose={() => setCurrentView("payment")} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Payment;
