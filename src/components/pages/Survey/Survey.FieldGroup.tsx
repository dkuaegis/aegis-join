import { Label } from "@/components/ui/label";
import { InterestItem, interestsEtc, interestsSecurity, interestsWeb } from "./Survey.Items";
import { Checkbox } from "@/components/ui/checkbox";
import { EtcInput } from "@/components/ui/etcinput";
import React from "react";
import { isETC, SurveyFormValues } from "./Survey.schema";
import { InterestField } from "@/types/api/survey";
import { useFormContext, useWatch } from "react-hook-form";
import { ControlledCheckbox } from "./Survey.ControlledCheckbox";

interface InterestFieldItemProps {
    id: InterestField;
    description: string;
  }

export function InterestFieldItem({ id, description } : InterestFieldItemProps) {

    const { register, formState: { errors } } = useFormContext<SurveyFormValues>();
    const selectedFields = useWatch({ name: "interestFields"});

    const isSelected = selectedFields.includes(id);

    return(
        <div key={id} className="flex flex-col justify-center space-y-1 min-h-[24px]">
        {/* 체크박스 */}
        <div className="flex items-center space-x-2">
            <ControlledCheckbox
                id={id}
                {...register("interestFields")}
            />
            <Label htmlFor={id}>{description}</Label>
            {isETC(id) && isSelected && (
            <>
            <EtcInput
                className="ml-6"
                placeholder="기타 관심 분야를 작성해주세요"
                {...register(`interestEtc.${id}`)}
            />
            {errors.interestEtc?.[id] && (
                <p className="pl-6 text-red-500 text-xs">
                {errors.interestEtc[id]?.message as string}
                </p>
            )}
            </>
        )}
        </div>


        </div>
    )
}

interface InterestFieldProps {
    name: string;
    interestField: InterestItem[];
    Icon: React.ComponentType;
}


export function InterestFieldGroup({ name, interestField, Icon } : InterestFieldProps) {
    return (
        <div className="mt-4">
        <div className="flex">
          <Icon />
          <Label className="pl-2 font-medium text-xl">{name}</Label>
        </div>
        <div className="mx-4 mt-2 grid gap-y-4">
          {interestField.map((field) => (
            <InterestFieldItem
              key={field.id}
              id={field.id}
              description={field.description}
            />
          ))}
        </div>
      </div>
    )
}