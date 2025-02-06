import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { forwardRef } from "react";
import type { Semester } from "@/types/api/member";

interface StudentAcademicSemesterProps {
  error?: string;
  value?: Semester;
  onChange?: (value: Semester) => void;
}

export const StudentAcademicSemester = forwardRef<HTMLDivElement, StudentAcademicSemesterProps>(
  ({ error, value, onChange, ...props }, ref)=>{
    return(
      <div className="space-y-2" {...props} ref={ref}>
        <Label htmlFor="academicSemester">모집 학기 기준 학기</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger
            className={error ? "border-red-500" : ""}
          >
            <SelectValue placeholder="학기 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FIRST">1학기</SelectItem>
            <SelectItem value="SECOND">2학기</SelectItem>
          </SelectContent>
        </Select>
        {error && (
          <p className="text-red-500 text-xs">학기를 선택해주세요</p>
        )}
      </div>
  );
});