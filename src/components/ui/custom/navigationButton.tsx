import { Suspense, lazy, useEffect, useState } from "react";

const Button = lazy(() =>
  import("@/components/ui/button").then((module) => ({ default: module.Button }))
);

export default function NavigationButtons({
  prev,
  next,
  isValid,
}: {
  prev: () => void;
  next: () => void;
  isValid?: boolean;
}) {
  const [buttonVariant, setButtonVariant] = useState<"default" | "secondary">("default");

  useEffect(() => {
    if (isValid !== undefined) {
      setButtonVariant(isValid ? "default" : "secondary");
    }
  }, [isValid]);

  return (
    <div className="fixed right-0 bottom-0 left-0 flex justify-center bg-background/80 p-4 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-md justify-between px-4 py-4">
        <Button type="button" onClick={prev}>
          이전
        </Button>

        <Suspense fallback={<button type="button" className="rounded bg-primary px-4 py-2">다음</button>}>
          <Button type="button" onClick={next} variant={buttonVariant}>
            다음
          </Button>
        </Suspense>
      </div>
    </div>
  );
}
