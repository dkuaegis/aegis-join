import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StudentPhoneNumberProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  formatPhoneNumber: (rawValue: string) => string;
  phoneNumberError: string | null;
  errors?: boolean;
  // showErrors?: boolean;
}

export function StudentPhoneNumber({phoneNumber, setPhoneNumber, formatPhoneNumber, phoneNumberError, errors}: StudentPhoneNumberProps){
  return (
    <div className="space-y-2">
        <Label htmlFor="phoneNumber">전화번호</Label>
        <Input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
          placeholder="010-1234-5678"
          className={errors ? "border-red-500" : ""} //errors && showErrors 변경
        />
        {phoneNumberError && ( //phoneNumberErrors && showErrors 변경
          <p className="text-red-500 text-xs">{phoneNumberError}</p>
        )}
        {errors && !phoneNumberError && ( //errors && showErrors 변경
          <p className="text-red-500 text-xs">전화번호를 입력해주세요</p>
        )}
      </div>
  );
}