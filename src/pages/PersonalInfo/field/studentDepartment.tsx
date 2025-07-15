import { Check, ChevronsUpDown } from "lucide-react";
import { forwardRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { departments } from "@/constants/departments";
import { cn } from "@/lib/utils";
import type { Department } from "@/types/api/member";
import { useControllerField } from "../PersonalInfo.ControlledField";
import { Button } from "@/components/ui/button";

interface StudentDepartmentProps {
  name: string; // name prop 추가
}

export const StudentDepartment = forwardRef<
  HTMLDivElement,
  StudentDepartmentProps
>(({ name, ...props }, ref) => {
  const [open, setOpen] = useState(false);
  const { field, error, isValid } = useControllerField({ name });

  const defaultDepartmentLabel =
    departments.find((dept) => dept.value === field.value)?.label ||
    "학과 선택";

  // CommandItem 스타일(검색창)
  const commandItemStyle = {
    whiteSpace: "nowrap", // 텍스트 줄바꿈 방지
    overflow: "hidden", // 넘치는 텍스트 숨김
    textOverflow: "ellipsis", // 말줄임표 표시
  };

  return (
    <div className="space-y-2" {...props} ref={ref}>
      <Label htmlFor="department">소속</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Button
              type="button"
              aria-invalid={!isValid}
              className={cn(
                "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                open && "ring-2 ring-ring ring-offset-2"
              )}
            >
              {defaultDepartmentLabel}
              <ChevronsUpDown className="size-4 opacity-50" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command>
            <CommandInput placeholder="학과를 검색해주세요." />
            <CommandList>
              <CommandEmpty>존재하지 않는 학과입니다.</CommandEmpty>
              <CommandGroup>
                {departments.map((departmentItem) => (
                  <CommandItem
                    key={departmentItem.value}
                    value={departmentItem.value}
                    onSelect={(currentValue) => {
                      field.onChange(currentValue as Department);
                      setOpen(false);
                    }}
                    style={commandItemStyle}
                  >
                    {field.value === departmentItem.value ? (
                      <Check className="mr-2 h-4 w-4" />
                    ) : (
                      <div className="mr-2 h-4 w-4" />
                    )}
                    {departmentItem.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {error && !isValid && (
        <p className="text-red-500 text-xs">학과를 선택해주세요</p>
      )}
    </div>
  );
});

StudentDepartment.displayName = "StudentDepartment";


