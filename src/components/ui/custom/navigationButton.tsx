import { useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useFunnel from "@/hooks/useFunnel";

interface NavigationButtonsProps {
  isValid?: boolean;
}

export default function NavigationButtons({ isValid }: NavigationButtonsProps) {
  const { next } = useFunnel();
  const [buttonVariant, setButtonVariant] = useState<"default" | "secondary">(
    "default"
  );

  useLayoutEffect(() => {
    setButtonVariant(isValid ? "default" : "secondary");
  }, [isValid]);

  return (
    <div className="fixed right-0 bottom-0 left-0 flex justify-center bg-background/80 p-4 backdrop-blur-xs">
      <div className="mx-auto flex w-full max-w-md justify-between py-2">
        <Button onClick={next} variant={buttonVariant} size="lg" className="min-w-full">
          다음
        </Button>
      </div>
    </div>
  );
}
