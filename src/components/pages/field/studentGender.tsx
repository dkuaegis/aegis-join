import { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Gender } from "@/types/api/member";

interface StudentGenderProps extends React.ComponentPropsWithoutRef<typeof RadioGroup> {
  error?: string;
}

export const StudentGender = forwardRef<HTMLDivElement, StudentGenderProps>(
  ({ error, onChange, ...props }, ref) => {

    const handleValueChange = (value: Gender) => {
      if (onChange) {
        onChange({target: { value } } as any);
      }
    }
  return(
    <div className="space-y-2">
        <Label>성별</Label>
        <RadioGroup 
          {...props}
          ref={ref}
          onValueChange={handleValueChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="MALE" id="MALE" />
            <Label htmlFor="MALE">남자</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="FEMALE" id="FEMALE" />
            <Label htmlFor="FEMALE">여자</Label>
          </div>
        </RadioGroup>
        {error && ( //errors && showErrors 변경
          <p className="text-red-500 text-xs">성별을 선택해주세요</p>
        )}
      </div>
  );
});
