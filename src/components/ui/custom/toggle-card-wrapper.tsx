import { type HTMLMotionProps, motion, type Variants } from "framer-motion";
import type React from "react";
import { cn } from "@/lib/utils";

interface ToggleCardWrapperProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      keyof HTMLMotionProps<"button">
    >,
    HTMLMotionProps<"button"> {
  isSelected: boolean;
  children: React.ReactNode;
}

const cardVariants: Variants = {
  unselected: {
    scale: 1,
    boxShadow:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", // shadow-md
  },
  selected: {
    scale: 1.05,
    y: -4,
    boxShadow:
      "0 0 0 2px rgba(240, 248, 255, 0.5), 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  },
  hover: {
    y: -4,
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", // shadow-lg
  },
};

const ToggleCardWrapper = ({
  isSelected,
  className,
  children,
  ...props
}: ToggleCardWrapperProps) => {
  return (
    <motion.button
      type="button"
      // 3. Variants 적용 및 애니메이션 제어
      variants={cardVariants}
      animate={isSelected ? "selected" : "unselected"}
      whileHover="hover"
      transition={{ type: "spring", stiffness: 300, damping: 20 }} // 물리 기반 스프링 애니메이션
      layout // 4. 크기 변경 시 주변 요소의 움직임을 부드럽게 처리
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 bg-white p-4",
        // 2. CSS transition-colors를 추가하고, 상태에 따라 border 색상 클래스를 직접 제어합니다.
        "transition-colors duration-300",
        isSelected
          ? // 👇 v4에서 정의한 클래스를 사용하여 선택 상태 스타일링
            "animate-aurora border-[oklch(var(--primary)/0.5)] bg-[length:300%_500%] bg-gradient-to-r from-white via-[aliceblue] to-white"
          : "border-slate-200 bg-white",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default ToggleCardWrapper;
