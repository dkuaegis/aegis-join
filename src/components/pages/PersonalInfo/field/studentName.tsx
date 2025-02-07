import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

interface StudentNameProps extends React.ComponentPropsWithoutRef<"input"> {
  error?: string;
}

export const StudentName = forwardRef<HTMLInputElement, StudentNameProps>(
  ({ error, ...props }, ref) => {
    const { formState } = useFormContext();
    const isValid = !formState.errors.name;

  return (
    <div className="space-y-2">
      <Label htmlFor="name">이름</Label>
      <Input
        id="name"
        placeholder="홍길동"
        ref={ref}
        className={error && !isValid ? "border-red-500" : ""}
        {...props}
      />
        {error && !isValid && (
          <p className="text-red-500 text-xs">이름을 입력해주세요</p>
        )}
    </div>
  );
});
