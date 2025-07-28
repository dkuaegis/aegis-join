import { useCallback, useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useFunnel from "@/hooks/useFunnel";

interface NavigationButtonsProps {
  isValid?: boolean;
  onNext?: () => void;
  onFetch?: () => Promise<boolean>;
  text?: string;
}

export default function NavigationButtons({
  isValid,
  onNext,
  onFetch,
  text,
}: NavigationButtonsProps) {
  const { next } = useFunnel();

  const goNext = onNext || next;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonVariant, setButtonVariant] = useState<"default" | "secondary">(
    "default"
  );

  useLayoutEffect(() => {
    setButtonVariant(isValid ? "default" : "secondary");
  }, [isValid]);

  const handleNext = useCallback(async () => {
    if (isLoading || !isValid) return;

    if (!onFetch) {
      goNext();
      return;
    }

    setIsLoading(true);
    try {
      const isSuccess = await onFetch();
      if (isSuccess) {
        goNext();
      } else {
        console.error("Error on fetch");
      }
    } catch (error) {
      console.error(`Error on fetch ${error}`);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isValid, onFetch, goNext]);

  return (
    <div className="fixed right-0 bottom-0 left-0 flex justify-center bg-background/80 p-4 backdrop-blur-xs">
      <div className="mx-auto flex w-full max-w-md justify-between py-2">
        <Button
          onClick={handleNext}
          variant={buttonVariant}
          size="lg"
          className="min-w-full"
        >
          {text ? text : "다음"}
        </Button>
      </div>
    </div>
  );
}
