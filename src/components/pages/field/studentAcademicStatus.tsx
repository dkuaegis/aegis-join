import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface StudentAcademicStatusProps {
  academicStatus: string;
  setAcademicStatus: (value: string) => void;
  errors?: boolean;
  // showErrors?: boolean;
}

export function StudentAcademicStatus({academicStatus, setAcademicStatus, errors}: StudentAcademicStatusProps){
  return(
    <div className="space-y-2">
        <Label htmlFor="academicStatus">모집 학기 기준 학적</Label>
        <Select value={academicStatus} onValueChange={setAcademicStatus}>
          <SelectTrigger
            className={errors ? "border-red-500" : ""}
          >
            <SelectValue placeholder="학적 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ENROLLED">재학</SelectItem>
            <SelectItem value="LEAVE_OF_ABSENCE">휴학</SelectItem>
            <SelectItem value="GRADUATED">졸업</SelectItem>
          </SelectContent>
        </Select>
        {errors && (
          <p className="text-red-500 text-xs">학적을 선택해주세요</p>
        )}
      </div>
  );
}