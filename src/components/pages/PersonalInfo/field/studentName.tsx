import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";
import { useControllerField } from "../PersonalInfo.ControlledField";

interface StudentNameProps {
  name: string; // name prop 추가
}

export const StudentName = forwardRef<HTMLInputElement, StudentNameProps>(
  ({ name, ...props }, ref) => {
    const { field, error, isValid } = useControllerField({ name });

    return (
      <div className="space-y-2">
        <Label htmlFor="name">이름</Label>
        <Input
          id="name"
          placeholder="홍길동"
          ref={ref}
          className={error && !isValid ? "border-red-500" : ""}
          value={field.value || ""} // field.value 연결
          onChange={field.onChange} // field.onChange 연결
          {...props}
        />
        {error && !isValid && (
          <p className="text-red-500 text-xs">이름을 입력해주세요</p>
        )}
      </div>
    );
  }
);

StudentName.displayName = "StudentName";
