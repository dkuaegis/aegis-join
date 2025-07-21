import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const StudentResidentNumber = () => {
  return (
    <div className="space-y-2">
      <Label htmlFor="registrationNumber">주민등록번호</Label>
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          inputMode="numeric"
          placeholder="생년월일 6자리"
          className="h-12 text-left text-base"
          aria-invalid="false"
          maxLength={6}
        />
        <span className="font-bold text-gray-400 text-xl">-</span>
        <Input
          type="text"
          inputMode="numeric"
          placeholder="성별"
          className="h-12 w-16 text-center text-base"
          aria-invalid="false"
          maxLength={1}
        />
        <div className="flex space-x-1">
          {[...Array(6)].map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: 이 목록은 정적이며 순서가 바뀌지 않으므로 인덱스를 key로 사용합니다.
            <div key={i} className="h-3 w-3 rounded-full bg-gray-300"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentResidentNumber;
