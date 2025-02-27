import type React from "react"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { forwardRef, useState, useEffect, useRef } from "react"
import { useControllerField } from "../PersonalInfo.ControlledField"

interface FreshProps extends React.ComponentPropsWithoutRef<typeof RadioGroup> {
  name: string
}

export const StudentFresh = forwardRef<HTMLDivElement, FreshProps>(({ name, ...props }, ref) => {
  const { field, error, isValid } = useControllerField({ name })
  const [isTooltipOpen, setIsTooltipOpen] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Add click outside listener to close tooltip
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isTooltipOpen && tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsTooltipOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isTooltipOpen])

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-1">
        <Label>신규/재등록 회원 여부</Label>
        <TooltipProvider>
          <Tooltip open={isTooltipOpen}>
            <TooltipTrigger asChild>
              <button type="button" onClick={() => setIsTooltipOpen((prev) => !prev)}>
                <Info className="h-4 w-4 cursor-pointer text-gray-500" />
              </button>
            </TooltipTrigger>
            {isTooltipOpen && (
              <TooltipContent ref={tooltipRef} side="right" className="w-44 max-w-xs break-words p-4 text-sm">
                <p className="mb-2">재등록 회원: 기존에 가입한 적이 있는 회원</p>
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
          <RadioGroupItem value="true" id="fresh" />
          <Label htmlFor="fresh">신규 회원</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="false" id="reregister" />
          <Label htmlFor="reregister">재등록 회원</Label>
        </div>
      </RadioGroup>

      {error && !isValid && <p className="text-red-500 text-xs">재등록 여부를 선택해주세요</p>}
    </div>
  )
})

StudentFresh.displayName = "StudentFresh"

