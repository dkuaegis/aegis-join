import { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Gender } from "@/types/api/member";
import { useFormContext } from "react-hook-form";

interface StudentGenderProps extends React.ComponentPropsWithoutRef<typeof RadioGroup> {
  error?: string;
  value?: Gender;
}

export const StudentGender = forwardRef<HTMLDivElement, StudentGenderProps>(
  ({ error, value, ...props }, ref) => {
  const { formState } = useFormContext();
  const isValid = !formState.errors.gender; // 에러가 없으면 유효함

  return(
    <div className="space-y-2">
        <Label>성별</Label>
        <RadioGroup 
          {...props}
          ref={ref}
          value={value}
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
