import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StudentNameProps {
  name: string;
  setName: (value: string) => void;
  errors?: boolean;
  showErrors?: boolean;
}

export function StudentName({ name, setName, errors, showErrors }: StudentNameProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="name">이름</Label>
      <Input
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="홍길동"
        className={errors && showErrors ? "border-red-500" : ""}
      />
        {errors && showErrors && (
          <p className="text-red-500 text-xs">이름을 입력해주세요</p>
        )}
    </div>
  );
}
