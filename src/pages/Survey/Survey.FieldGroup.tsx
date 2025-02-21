import { EtcInput } from "@/components/ui/etcinput";
import { Label } from "@/components/ui/label";
import type { InterestField } from "@/types/api/survey";
import type React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ControlledCheckbox } from "./Survey.ControlledCheckbox";
import type { InterestItem } from "./Survey.Items";
import { type SurveyFormValues, isETC } from "./Survey.schema";

interface InterestFieldItemProps {
  id: InterestField;
  description: string;
}

export function InterestFieldItem({ id, description }: InterestFieldItemProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<SurveyFormValues>();

  const selectedFields = useWatch({ name: "interests" });
  const isSelected =
    Array.isArray(selectedFields) && selectedFields.includes(id);

  return (
    <div key={id} className="flex flex-col justify-center space-y-1">
      <div className="flex min-h-[24px] items-center space-x-2 text-[14px] sm:text-[14px]">
        <ControlledCheckbox id={id} />
        <Label htmlFor={id}>{description}</Label>
        {isETC(id) && isSelected && (
          <EtcInput
            className="ml-6 text-[14px] sm:text-[14px]" // 입력 필드 내 텍스트 크기 고정
            placeholder="기타 관심 분야를 작성해주세요"
            maxLength={20}
            {...register(`interestsEtc.${id}`)}
          />
        )}
      </div>
      {isETC(id) && (
        <p
          className={`pl-6 text-[10px] text-red-500 sm:text-[10px] ${
            errors.interestsEtc?.[id] && isSelected
              ? "visible opacity-100"
              : "invisible opacity-0"
          }`}
        >
          {errors.interestsEtc?.[id]?.message || "😀"}
        </p>
      )}
    </div>
  );
}

interface InterestFieldProps {
  name: string;
  interestField: InterestItem[];
  Icon: React.ComponentType;
}

export function InterestFieldGroup({
  name,
  interestField,
  Icon,
}: InterestFieldProps) {
  return (
    <div className="mt-4">
      <div className="flex">
        <Icon />
        <Label className="pl-2 font-medium text-xl">{name}</Label>
      </div>
      <div className="mx-4 mt-2 grid gap-y-4 text-[16px] sm:text-[16px]">
        {interestField.map((field) => (
          <InterestFieldItem
            key={field.id}
            id={field.id}
            description={field.description}
          />
        ))}
      </div>
    </div>
  );
}
