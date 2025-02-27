import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AcquisitionType as AcquisitionTypeEnum } from "@/types/api/survey"; // AcquisitionType enum import, enum 이름 충돌 방지를 위해 AcquisitionTypeEnum 으로 alias
import { useFormContext } from "react-hook-form";
import type { SurveyFormValues } from "./Survey.schema";

export const AcquisitionType = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SurveyFormValues>();

  return (
    <div className="space-y-2">
      <Label htmlFor="acquisitionType" className="flex items-end text-xl">
        유입 경로{" "}
        <span
          className={`pb-1 pl-2 text-red-500 text-xs ${
            errors.acquisitionType
              ? "visibility-visible opacity-100"
              : "visibility-hidden opacity-0"
          }`}
        >
          *필수 항목입니다
        </span>
      </Label>
      <Select
        onValueChange={(value) => {
          register("acquisitionType").onChange({
            target: { name: "acquisitionType", value },
          });
        }}
      >
        <SelectTrigger
          className={errors.acquisitionType ? "border-red-500" : ""}
        >
          <SelectValue placeholder="유입 경로 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={AcquisitionTypeEnum.INSTAGRAM}>
            인스타그램
          </SelectItem>
          <SelectItem value={AcquisitionTypeEnum.EVERYTIME}>
            에브리타임
          </SelectItem>
          <SelectItem value={AcquisitionTypeEnum.FRIEND}>지인 추천</SelectItem>
          <SelectItem value={AcquisitionTypeEnum.CLUB_FAIR}>알림제</SelectItem>
          <SelectItem value={AcquisitionTypeEnum.ETC}>기타</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

AcquisitionType.displayName = "AcquisitionType";
