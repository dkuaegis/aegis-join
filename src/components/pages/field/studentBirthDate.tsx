import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";
import { useFormContext } from "react-hook-form";

interface StudentBirthDateProps extends React.ComponentPropsWithoutRef<"input"> {
  error?: string;
}

export const StudentBirthDate = forwardRef<HTMLInputElement, StudentBirthDateProps>(
  ({error, ...props}, ref)=>{
    const { formState } = useFormContext();
    const isValid = !formState.errors.birthDate;

  return (
    <div className="space-y-2">
      <Label htmlFor="birthDate">생년월일</Label>
      <Input
        id="birthDate"
        placeholder="020101"
        maxLength={6}
        ref={ref}          
        className={error && !isValid ? "border-red-500" : ""}
        {...props}
      />
        {error && !isValid && (
          <p className="text-red-500 text-xs">생년월일을 6자리로 입력해주세요</p>
        )}
      </div>
  );
});
