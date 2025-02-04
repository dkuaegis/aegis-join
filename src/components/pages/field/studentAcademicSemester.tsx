import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StudentAcademicSemesterProps {
  academicSemester: string;
  setAcademicSemester: (value: string) => void;
  errors?: boolean;
  // showErrors?: boolean;
}

export function StudentAcademicSemester({academicSemester, setAcademicSemester, errors}: StudentAcademicSemesterProps){
  return(
    <div className="space-y-2">
        <Label htmlFor="academicSemester">모집 학기 기준 학기</Label>
        <Select value={academicSemester} onValueChange={setAcademicSemester}>
          <SelectTrigger
            className={errors ? "border-red-500" : ""}
          >
            <SelectValue placeholder="학기 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FIRST">1학기</SelectItem>
            <SelectItem value="SECOND">2학기</SelectItem>
          </SelectContent>
        </Select>
        {errors && (
          <p className="text-red-500 text-xs">학기를 선택해주세요</p>
        )}
      </div>
  );
}