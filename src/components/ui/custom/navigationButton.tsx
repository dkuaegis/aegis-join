import { useCallback, useLayoutEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import useFunnel from "@/hooks/useFunnel";

interface NavigationButtonsProps {
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  text?: string;
}

export default function NavigationButtons({
  onClick,
  disabled = false,
  isLoading = false,
  text = "다음",
}: NavigationButtonsProps) {
  const buttonVariant = disabled ? "secondary" : "default";

  return (
    <div className="fixed right-0 bottom-0 left-0 flex justify-center bg-background/80 p-4 backdrop-blur-xs">
      <div className="mx-auto flex w-full max-w-md justify-between py-2">
        <Button
          type="submit"
          onClick={onClick}
          variant={buttonVariant}
          disabled={isLoading || disabled}
          size="lg"
          className="min-w-full"
        >
          {text}
        </Button>
      </div>
    </div>
  );
}
