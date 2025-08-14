import { useFormContext } from "react-hook-form";
import ClubFairIcon from "@/assets/club-fair.svg";
import EtcIcon from "@/assets/etc.svg";
import EverytimeIcon from "@/assets/everytime.svg";
import FriendIcon from "@/assets/friend.svg";
import OfflineEventIcon from "@/assets/offline-event.svg";
import InstagramIcon from "@/assets/instagramIcon.svg";
import { ErrorMessage } from "@/components/ui/custom/error-message";
import { Label } from "@/components/ui/label";
import { AcquisitionType as AcquisitionTypeEnum } from "@/types/api/survey";
import { AcquisitionCard } from "./AcquisitionCard";
import type { SurveyFormValues } from "./Survey.schema";

const acquisitionTypes = [
  {
    value: AcquisitionTypeEnum.INSTAGRAM,
    label: "인스타그램",
    icon: InstagramIcon,
  },
  {
    value: AcquisitionTypeEnum.EVERYTIME,
    label: "에브리타임",
    icon: EverytimeIcon,
  },
  { value: AcquisitionTypeEnum.FRIEND, label: "지인 추천", icon: FriendIcon },
  { value: AcquisitionTypeEnum.CLUB_FAIR, label: "알림제", icon: ClubFairIcon },
  {
    value: AcquisitionTypeEnum.OFFLINE_EVENT,
    label: "오프라인 행사",
    icon: OfflineEventIcon,
  },
  { value: AcquisitionTypeEnum.ETC, label: "기타", icon: EtcIcon },
];

export const AcquisitionType = () => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<SurveyFormValues>();

  const selectedValue = watch("acquisitionType");

  return (
    <div className="space-y-2">
      <Label htmlFor="acquisitionType" className="text-lg">
        유입 경로
      </Label>
      <div className="grid grid-cols-3 gap-4">
        {acquisitionTypes.map(({ value, label, icon }) => (
          <AcquisitionCard
            key={value}
            label={label}
            icon={icon}
            isSelected={selectedValue === value}
            onClick={() =>
              setValue("acquisitionType", value, { shouldValidate: true })
            }
          />
        ))}
      </div>
      <ErrorMessage
        isShown={!!errors.acquisitionType}
        message={errors.acquisitionType?.message}
      />
    </div>
  );
};

AcquisitionType.displayName = "AcquisitionType";
