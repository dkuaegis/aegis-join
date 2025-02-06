import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";
import type { Grade } from "@/types/api/member";
import { useFormContext } from "react-hook-form";

//학년 필드 배열
const grades = [
  { value: "ONE", label: "1학년" },
  { value: "TWO", label: "2학년" },
  { value: "THREE", label: "3학년" },
  { value: "FOUR", label: "4학년" },
  { value: "FIVE", label: "5학년" },
];

interface StudentGradeProps extends React.ComponentPropsWithoutRef<typeof Select>{
  error?: string;
  value?: Grade;
  onChange?: (value: Grade) => void;
}

export const StudentGrade = forwardRef<HTMLDivElement, StudentGradeProps>(
  ({ error, value, onChange, ...props }, ref)=>{
    const { formState } = useFormContext();
    const isValid = !formState.errors.grade;

  return(
    <div className="space-y-2" {...props} ref={ref}>
        <Label htmlFor="grade">모집 학기 기준 학년</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className={error && !isValid ? "border-red-500" : ""}>
            <SelectValue placeholder="학년 선택" />
          </SelectTrigger>
          <SelectContent>
            {grades.map((grade) => (
              <SelectItem key={grade.value} value={grade.value}>
                {grade.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && !isValid && (
          <p className="text-red-500 text-xs">학년을 선택해주세요</p>
        )}
      </div>
  );
});
