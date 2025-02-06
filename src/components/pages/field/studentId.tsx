import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";

interface StudentIdProps extends React.ComponentPropsWithoutRef<"input"> {
  error?: string;
}

export const StudentId = forwardRef<HTMLInputElement>({studentId, setStudentId, errors}: StudentIdProps){
  return (
    <div className="space-y-2">
        <Label htmlFor="studentId">학번</Label>
        <Input
          id="studentId"
          value={studentId}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/[^0-9]/g, "").slice(0, 8);
            setStudentId(rawValue);
          }}
          placeholder="32000000"
          className={errors ? "border-red-500" : ""} //errors && showErrors 변경
        />
        {errors && ( //errors && showErrors 변경
          <p className="text-red-500 text-xs">학번을 입력해주세요</p>
        )}
      </div>
  );
}