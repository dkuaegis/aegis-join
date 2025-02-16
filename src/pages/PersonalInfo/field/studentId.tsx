import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef, useCallback } from "react";
import { useControllerField } from "../PersonalInfo.ControlledField";

interface StudentIdProps {
  name: string; // name prop 추가
}

export const StudentId = forwardRef<HTMLInputElement, StudentIdProps>(
  ({ name, ...props }, ref) => {
    const { field, error, isValid } = useControllerField({ name });

    // 숫자만 입력 가능하도록 처리하는 함수
    const handleInputChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/[^0-9]/g, ""); // 숫자 이외의 문자 제거
        field.onChange(value); // 변경된 값을 field.onChange에 전달
      },
      [field.onChange]
    );

    return (
      <div className="space-y-2">
        <Label htmlFor="studentId">학번</Label>
        <Input
          type="text" // type을 "number"에서 "text"로 변경 (type number는 0으로 시작하는 숫자 입력이 안됨)
          id="studentId"
          placeholder="32000000"
          maxLength={8}
          ref={ref}
          className={error && !isValid ? "border-red-500" : ""}
          value={field.value || ""}
          onChange={handleInputChange} // handleInputChange 함수 연결
          {...props}
        />
        {error && !isValid && (
          <p className="text-red-500 text-xs">학번을 입력해주세요</p>
        )}
      </div>
    );
  }
);

StudentId.displayName = "StudentId";
