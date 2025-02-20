import { Button } from "@/components/ui/button";
import { useLayoutEffect, useState } from "react";

interface NavigationButtonsProps {
  prev: () => void;
  next: () => void;
  isValid?: boolean;
  first?: boolean;
  last?: boolean;
}

function navigationButtonStyle(visible: boolean) {
  return `w-[42.5%]  ${visible ? "invisible" : ""}`;
}

export default function NavigationButtons({
  prev,
  next,
  isValid,
  first = false,
  last = false,
}: NavigationButtonsProps) {
  const [buttonVariant, setButtonVariant] = useState<"default" | "secondary">(
    "default"
  );

  useLayoutEffect(() => {
    setButtonVariant(isValid ? "default" : "secondary");
  }, [isValid]);

  return (
    <div className="fixed right-0 bottom-0 left-0 flex justify-center bg-background/80 p-4 backdrop-blur-sm">
      <div className="flex mx-auto max-w-md py-2 w-full justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={prev}
          size="lg"
          className={navigationButtonStyle(first)}
        >
          이전
        </Button>
        <Button
          onClick={next}
          variant={buttonVariant}
          size="lg"
          className={navigationButtonStyle(last)}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
