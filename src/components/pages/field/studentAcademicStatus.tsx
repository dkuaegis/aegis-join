import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";
import { AcademicStatus } from "@/types/api/member";

interface StudentAcademicStatusProps extends React.ComponentPropsWithoutRef<typeof Select> {
  error?: string;
  value?: AcademicStatus;
  onChange?: (value: AcademicStatus) => void;
}

export const StudentAcademicStatus = forwardRef<HTMLDivElement, StudentAcademicStatusProps>(
  ({ error, value, onChange, ...props }, ref) => {
    return (
      <div className="space-y-2" {...props} ref={ref}>
        <Label htmlFor="academicStatus">모집 학기 기준 학적</Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger id="academicStatus" className={error ? "border-red-500" : ""}>
            <SelectValue placeholder="학적 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={AcademicStatus.ENROLLED}>재학</SelectItem>
            <SelectItem value={AcademicStatus.LEAVE_OF_ABSENCE}>휴학</SelectItem>
            <SelectItem value={AcademicStatus.GRADUATED}>졸업</SelectItem>
          </SelectContent>
        </Select>
        {error && <p className="text-red-500 text-xs">학적을 선택해주세요</p>}
      </div>
    );
  }
);
