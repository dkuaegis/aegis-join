import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AcademicStatus } from "@/types/api/member";
import { forwardRef } from "react";
import { useControllerField } from "../PersonalInfo.ControlledField";

interface StudentAcademicStatusProps {
  name: string; // name prop 추가
}

export const StudentAcademicStatus = forwardRef<
  HTMLDivElement,
  StudentAcademicStatusProps
>(({ name, ...props }, ref) => {
  const { field, error, isValid } = useControllerField({ name });

  return (
    <div className="space-y-2" {...props} ref={ref}>
      <Label htmlFor="academicStatus">모집 학기 기준 학적</Label>
      <Select value={field.value ?? ""} onValueChange={field.onChange}>
        <SelectTrigger
          id="academicStatus"
          className={error && !isValid ? "border-red-500" : ""}
        >
          <SelectValue placeholder="학적 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={AcademicStatus.ENROLLED}>재학</SelectItem>
          <SelectItem value={AcademicStatus.LEAVE_OF_ABSENCE}>휴학</SelectItem>
          <SelectItem value={AcademicStatus.GRADUATED}>졸업</SelectItem>
        </SelectContent>
      </Select>
      {error && !isValid && (
        <p className="text-red-500 text-xs">학적을 선택해주세요</p>
      )}
    </div>
  );
});

StudentAcademicStatus.displayName = "StudentAcademicStatus";
