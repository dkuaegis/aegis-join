import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { forwardRef } from "react";
import { useControllerField } from "../PersonalInfo.ControlledField";

interface StudentSemesterProps {
  name: string; // name prop 추가
}

export const StudentSemester = forwardRef<
  HTMLDivElement,
  StudentSemesterProps
>(({ name, ...props }, ref) => {
  const { field, error, isValid } = useControllerField({ name });

  return (
    <div className="space-y-2" {...props} ref={ref}>
      <Label htmlFor="semester">모집 학기 기준 학기</Label>
      <Select value={field.value} onValueChange={field.onChange}>
        <SelectTrigger className={error && !isValid ? "border-red-500" : ""}>
          <SelectValue placeholder="학기 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="FIRST">1학기</SelectItem>
          <SelectItem value="SECOND">2학기</SelectItem>
        </SelectContent>
      </Select>
      {error && !isValid && (
        <p className="text-red-500 text-xs">학기를 선택해주세요</p>
      )}
    </div>
  );
});

StudentSemester.displayName = "StudentSemester";
