import { Button } from "@/components/ui/button";
import { useLayoutEffect, useState } from "react";

export default function NavigationButtons({
  prev,
  next,
  isValid,
}: {
  prev: () => void;
  next: () => void;
  isValid?: boolean;
}) {
  const [buttonVariant, setButtonVariant] = useState<"default" | "secondary">(
    "default"
  );

  useLayoutEffect(() => {
    setButtonVariant(isValid ? "default" : "secondary");
  }, [isValid]);

  return (
    <div className="fixed right-0 bottom-0 left-0 flex justify-center bg-background/80 p-4 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-md justify-between px-4 py-4">
        <Button type="button" onClick={prev}>
          이전
        </Button>
        <Button onClick={next} variant={buttonVariant}>
          다음
        </Button>
      </div>
    </div>
  );
}
