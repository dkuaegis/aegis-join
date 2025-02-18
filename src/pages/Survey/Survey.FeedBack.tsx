import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import type { SurveyFormValues } from "./Survey.schema";

export default function Feedback() {
  const { register } = useFormContext<SurveyFormValues>();

  return (
    <>
      <Label htmlFor="feedback" className="text-xl">
        운영진에게 하고 싶은 말
      </Label>
      <Textarea
        id="feedback"
        placeholder="동아리에서 어떤 활동을 하고 싶으신가요?"
        maxLength={511}
        {...register("feedback")}
      />
    </>
  );
}
