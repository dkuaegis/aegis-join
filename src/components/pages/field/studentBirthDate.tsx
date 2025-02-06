import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";

interface StudentBirthDateProps extends React.ComponentPropsWithoutRef<"input"> {
  error?: string; 
}

export const StudentBirthDate = forwardRef<HTMLInputElement, StudentBirthDateProps>(
  ({ error, onChange, ...props }, ref) =>{ 
  return(
    <div className="space-y-2">
        <Label htmlFor="birthDate">생년월일</Label>
        <Input
          id="birthDate"
          ref={ref}
          placeholder="020101"
          {...props}
          className={error ? "border-red-500" : ""}  //errors && showErrors 변경
        />
        {error && ( //errors && showErrors 변경
          <p className="text-red-500 text-xs">생년월일을 입력해주세요</p>
        )}
      </div>
  );
});