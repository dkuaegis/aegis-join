import { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Gender } from "@/types/api/member";

interface StudentGenderProps {
  error?: string;
  value?: Gender;
  onChange?: (value: Gender) => void;
  isValid: boolean;
}

export const StudentGender = forwardRef<HTMLDivElement, StudentGenderProps>(
  ({ error, value, onChange, isValid, ...props }, ref) => {

  return(
    <div className="space-y-2">
        <Label>성별</Label>
        <RadioGroup 
          {...props}
          ref={ref}
          value={value}
          onValueChange={onChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={Gender.MALE} id="MALE" />
            <Label htmlFor="MALE">남자</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={Gender.FEMALE} id="FEMALE" />
            <Label htmlFor="FEMALE">여자</Label>
          </div>
        </RadioGroup>
        {error && !isValid && (
          <p className="text-red-500 text-xs">성별을 선택해주세요</p>
        )}
      </div>
  );
});
