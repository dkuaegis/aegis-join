import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";

interface StudentNameProps extends React.ComponentPropsWithoutRef<"input"> {
  error?: string;
}

export const StudentName = forwardRef<HTMLInputElement, StudentNameProps>(
  ({ error, ...props }, ref) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="name">이름</Label>
      <Input
        id="name"
        placeholder="홍길동"
        ref={ref}
        className={error ? "border-red-500" : ""} //errors && showErrors 변경
        {...props}
      />
        {error && ( //errors && showErrors 변경
          <p className="text-red-500 text-xs">이름을 입력해주세요</p>
        )}
    </div>
  );
});
