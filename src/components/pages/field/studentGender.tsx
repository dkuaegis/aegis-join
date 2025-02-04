import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Gender } from "@/types/api/member";

interface StudentGenderProps {
  gender: Gender;
  setGender: (value: Gender) => void;
  errors?: boolean;
  showErrors?: boolean;
}

export function StudentGender({gender, setGender, errors, showErrors}: StudentGenderProps) {
  return(
    <div className="space-y-2">
        <Label>성별</Label>
        <RadioGroup value={gender} onValueChange={setGender}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="MALE" id="MALE" />
            <Label htmlFor="MALE">남자</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="FEMALE" id="FEMALE" />
            <Label htmlFor="FEMALE">여자</Label>
          </div>
        </RadioGroup>
        {errors && showErrors && (
          <p className="text-red-500 text-xs">성별을 선택해주세요</p>
        )}
      </div>
  );
}
