import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SurveyFormValues } from "./Survey.schema";
import { ErrorMessage } from "@/components/ui/custom/error-message";

const JoinReason = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SurveyFormValues>();

  return (
    <div className="space-y-2">
      <Label htmlFor="joinReason" className="flex items-end text-base">
        가입 이유{" "}
      </Label>
      <Textarea
        id="joinReason"
        placeholder="동아리에서 어떤 활동을 하고 싶으신가요? 자유롭게 작성해주세요!"
        maxLength={510}
        {...register("joinReason")}
      />
      <ErrorMessage
        isShown={!!errors.joinReason}
        message={errors.joinReason?.message}
      />
    </div>
  );
};

export default JoinReason;
