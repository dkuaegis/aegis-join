import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef, useCallback, type ChangeEventHandler } from "react";
import { formatPhoneNumber } from "@/utils/PersonalInfo.helper";
interface StudentPhoneNumberProps extends React.ComponentPropsWithoutRef<"input"> {
  error?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;  
  value: string;
}
export const StudentPhoneNumber = forwardRef<HTMLInputElement, StudentPhoneNumberProps>(
  ({error, onChange, value, ...props}, ref)=>{

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => { // 타입 명시
          const rawValue = event.target.value;
          const formattedValue = formatPhoneNumber(rawValue);
          event.target.value = formattedValue; // 포맷된 값을 Input Element에 직접 설정
          onChange(event); // 이벤트 객체 전달
        },
        [onChange]
    );

  return (
    <div className="space-y-2">
      <Label htmlFor="phoneNumber">전화번호</Label>
      <Input
        type="tel"
        id="phoneNumber"
        placeholder="010-1234-5678"
        ref={ref}
        className={error ? "border-red-500" : ""}
        value={value}
        onChange={handleInputChange}
        maxLength={13} // 010-1234-5678
        {...props}
      />
        {error && (
          <p className="text-red-500 text-xs">전화번호를 입력해주세요</p>
        )}
      </div>
  );
});