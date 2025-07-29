import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forwardRef } from "react";
import { useControllerField } from "../PersonalInfo.ControlledField";
import { ErrorMessage } from "@/components/ui/custom/error-message";


interface StudentResidentNumberProps
  extends React.ComponentPropsWithoutRef<"input"> {
  name: string; // name prop 추가
}

const StudentResidentNumber = forwardRef<HTMLDivElement>((props, ref) => {
  
  const {
    field: birthDateField,
    error: birthDateError,
    isValid: isBirthDateValid,
  } = useControllerField({ name: "birthDate" });

  const {
    field: genderField,
    error: genderError,
    isValid: isGenderValid,
  } = useControllerField({ name: "gender" });

  return (
    <div className="space-y-2" ref={ref} {...props}>
      <Label htmlFor="registrationNumber">주민등록번호</Label>
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          inputMode="numeric"
          placeholder="생년월일 6자리"
          className="h-12 text-left text-base"
          maxLength={6}
          aria-invalid={!isBirthDateValid}
          value={birthDateField.value || ""}
          onChange={birthDateField.onChange}
          onBlur={birthDateField.onBlur}
          ref={birthDateField.ref} // ref도 연결해줍니다.
        />
        <span className="font-bold text-gray-400 text-xl">-</span>
        <Input
          type="text"
          inputMode="numeric"
          placeholder="성별"
          className="h-12 w-16 text-center text-base"
          maxLength={1}
          aria-invalid={!isGenderValid}
          value={genderField.value || ""}
          onChange={genderField.onChange}
          onBlur={genderField.onBlur}
          ref={genderField.ref}
        />
        <div className="flex space-x-1">
          {[...Array(6)].map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: 이 목록은 정적이며 순서가 바뀌지 않으므로 인덱스를 key로 사용합니다.
            <div key={i} className="h-3 w-3 rounded-full bg-gray-300"></div>
          ))}
        </div>
      </div>
      <ErrorMessage
        isShown={!!birthDateError || !!genderError}
        message="유효하지 않은 주민등록번호입니다"
      />
    </div>
  );
});

export default StudentResidentNumber;
