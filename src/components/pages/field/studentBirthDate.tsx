import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StudentBirthDateProps {
  birthDate: string;
  setBirthDate: (value: string) => void;
  errors?: boolean; 
  // showErrors?: boolean;
}

export function StudentBirthDate({ birthDate, setBirthDate, errors }: StudentBirthDateProps) {  //errors && showErrors 변경
  return(
    <div className="space-y-2">
        <Label htmlFor="birthDate">생년월일</Label>
        <Input
          id="birthDate"
          value={birthDate}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
            setBirthDate(rawValue);
          }}
          placeholder="020101"
          className={errors ? "border-red-500" : ""}  //errors && showErrors 변경
        />
        {errors && ( //errors && showErrors 변경
          <p className="text-red-500 text-xs">생년월일을 입력해주세요</p>
        )}
      </div>
  );
}