import { forwardRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPhoneNumber } from "@/pages/PersonalInfo/PersonalInfo.helper";
import { useControllerField } from "../PersonalInfo.ControlledField";
import { ErrorMessage } from "@/components/ui/custom/error-message";

interface StudentPhoneNumberProps
  extends React.ComponentPropsWithoutRef<"input"> {
  name: string; // name prop 추가
}

export const StudentPhoneNumber = forwardRef<
  HTMLInputElement,
  StudentPhoneNumberProps
>(({ name, ...props }, ref) => {
  const { field, error, isValid } = useControllerField({ name });

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // 타입 명시
      const rawValue = event.target.value;
      const formattedValue = formatPhoneNumber(rawValue);
      field.onChange(formattedValue);
    },
    [field.onChange]
  );

  return (
    <div className="space-y-2">
      <Label htmlFor="phoneNumber">전화번호</Label>
      <Input
        type="tel"
        id="phoneNumber"
        placeholder="010-1234-5678"
        ref={ref}
        aria-invalid={!isValid}
        value={field.value || ""}
        onChange={handleInputChange}
        maxLength={13} // 010-1234-5678
        {...props}
      />
      <ErrorMessage
        isShown={!!error && !isValid}
        message="전화번호를 입력해주세요"
      />
    </div>
  );
});

StudentPhoneNumber.displayName = "StudentPhoneNumber";
