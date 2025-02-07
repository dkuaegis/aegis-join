import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPhoneNumber } from "@/utils/PersonalInfo.helper";
import { forwardRef, useCallback } from "react";
import { useControllerField } from "../PersonalInfo.ControlledField";

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
        className={error && !isValid ? "border-red-500" : ""}
        value={field.value || ""}
        onChange={handleInputChange}
        maxLength={13} // 010-1234-5678
        {...props}
      />
      {error && !isValid && (
        <p className="text-red-500 text-xs">전화번호를 입력해주세요</p>
      )}
    </div>
  );
});

StudentPhoneNumber.displayName = "StudentPhoneNumber";
