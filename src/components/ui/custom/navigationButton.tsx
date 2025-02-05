import { Button } from "@/components/ui/button"

export default function NavigationButtons({
  prev,
  next,
}: {
  prev: () => void
  next: () => void
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p- flex justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="flex justify-between mx-auto w-full max-w-md px-4 py-4">
        <Button onClick={prev}>이전</Button>
        <Button onClick={next}>다음</Button>
      </div>
    </div>
  )
}
