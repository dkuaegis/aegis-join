import { Button } from "@/components/ui/button";
import { useLayoutEffect, useState } from "react";

interface NavigationButtonsProps {
  prev: () => void;
  next: () => void;
  isValid?: boolean;
  showPrev?: boolean;
  showNext?: boolean;
}

function navigationButtonStyle(visible: boolean) {
  return `w-[42.5%] ${visible ? "invisible" : ""}`;
}

export default function NavigationButtons({
  prev,
  next,
  isValid,
  showPrev = false,
  showNext = false,
}: NavigationButtonsProps) {
  const [buttonVariant, setButtonVariant] = useState<"default" | "secondary">(
    "default"
  );

  useLayoutEffect(() => {
    setButtonVariant(isValid ? "default" : "secondary");
  }, [isValid]);

  return (
    <div className="fixed right-0 bottom-0 left-0 flex justify-center bg-background/80 p-4 backdrop-blur-xs">
      <div className="mx-auto flex w-full max-w-md justify-between py-2">
        <Button
          type="button"
          variant="outline"
          onClick={prev}
          size="lg"
          className={navigationButtonStyle(showPrev)}
        >
          이전
        </Button>
        <Button
          onClick={next}
          variant={buttonVariant}
          size="lg"
          className={navigationButtonStyle(showNext)}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
