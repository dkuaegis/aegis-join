import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import type { SurveyFormValues } from "./Survey.schema";

export default function JoinReason() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SurveyFormValues>();

  return (
    <div className="space-y-2">
      <Label htmlFor="joinReason" className="flex items-end text-xl">
        가입 이유{" "}
        <span
          className={`pb-1 pl-2 text-red-500 text-xs ${
            errors.joinReason
              ? "visibility-visible opacity-100"
              : "visibility-hidden opacity-0"
          }`}
        >
          *필수 항목입니다
        </span>
      </Label>
      <Textarea
        id="joinReason"
        placeholder="동아리에서 어떤 활동을 하고 싶으신가요?"
        maxLength={511}
        {...register("joinReason")}
      />
    </div>
  );
}
