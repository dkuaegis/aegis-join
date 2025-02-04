import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

//학년 필드 배열
const grades = [
  { value: "ONE", label: "1학년" },
  { value: "TWO", label: "2학년" },
  { value: "THREE", label: "3학년" },
  { value: "FOUR", label: "4학년" },
  { value: "FIVE", label: "5학년" },
];

interface StudentGradeProps {
  grade: string;
  setGrade: (value: string) => void;
  errors?: boolean;
  // showErrors?: boolean;
}

export function StudentGrade({grade, setGrade, errors}: StudentGradeProps){
  return(
    <div className="space-y-2">
        <Label htmlFor="grade">모집 학기 기준 학년</Label>
        <Select value={grade} onValueChange={setGrade}>
          <SelectTrigger className={errors ? "border-red-500" : ""}>
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
        {errors && (
          <p className="text-red-500 text-xs">학년을 선택해주세요</p>
        )}
      </div>
  );
}