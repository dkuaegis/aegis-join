import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

interface StudentIdProps extends React.ComponentPropsWithoutRef<"input"> {
  error?: string;
}

export const StudentId = forwardRef<HTMLInputElement, StudentIdProps>(
  ({error, ...props}, ref)=>{
    const { formState } = useFormContext();
    const isValid = !formState.errors.studentId;

  return (
    <div className="space-y-2">
      <Label htmlFor="studentId">학번</Label>
      <Input
        id="studentId"
        placeholder="32000000"
        maxLength={8}
        ref={ref}          
        className={error && !isValid ? "border-red-500" : ""}
        {...props}
      />
        {error && !isValid && (
          <p className="text-red-500 text-xs">학번을 입력해주세요</p>
        )}
      </div>
  );
});
