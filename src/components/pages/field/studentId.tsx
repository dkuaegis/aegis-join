import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";

interface StudentIdProps extends React.ComponentPropsWithoutRef<"input"> {
  error?: string;
}

export const StudentId = forwardRef<HTMLInputElement, StudentIdProps>(
  ({error, ...props}, ref)=>{
  return (
    <div className="space-y-2">
      <Label htmlFor="studentId">학번</Label>
      <Input
        id="studentId"
        placeholder="32000000"
        maxLength={8}
        ref={ref}          
        className={error ? "border-red-500" : ""} //errors && showErrors 변경
        {...props}
      />
        {error && ( //errors && showErrors 변경
          <p className="text-red-500 text-xs">학번을 입력해주세요</p>
        )}
      </div>
  );
});