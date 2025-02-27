import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react"; // i 아이콘 추가
import { forwardRef, useState } from "react";
import { useControllerField } from "../PersonalInfo.ControlledField";

interface ReRegistrationStatusProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroup> {
  name: string;
}

export const StudentReRegistrationStatus = forwardRef<
  HTMLDivElement,
  ReRegistrationStatusProps
>(({ name, ...props }, ref) => {
  const { field, error, isValid } = useControllerField({ name });
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-1">
        <Label>재등록/신규 회원 여부</Label>
        <TooltipProvider>
          <Tooltip open={isTooltipOpen}>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => setIsTooltipOpen((prev) => !prev)}
              >
                <Info className="h-4 w-4 cursor-pointer text-gray-500" />
              </button>
            </TooltipTrigger>
            {isTooltipOpen && (
              <TooltipContent side="right">
                <p>재등록 회원: 기존에 가입한 적이 있는 회원</p>
                <p>신규 회원: 처음 가입하는 회원</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

      <RadioGroup
        {...props}
        ref={ref}
        value={String(field.value)}
        onValueChange={(val) => field.onChange(val === "true")}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="true" id="reRegistration" />
          <Label htmlFor="reRegistration">재등록 회원</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="false" id="newMember" />
          <Label htmlFor="newMember">신규 회원</Label>
        </div>
      </RadioGroup>

      {error && !isValid && (
        <p className="text-red-500 text-xs">재등록 여부를 선택해주세요</p>
      )}
    </div>
  );
});

StudentReRegistrationStatus.displayName = "StudentReRegistrationStatus";
