import { Checkbox } from "@/components/ui/checkbox";
import type { InterestField } from "@/types/api/survey";
import { Controller, useFormContext } from "react-hook-form";
import type { SurveyFormValues } from "./Survey.schema";

export function ControlledCheckbox({ id }: { id: InterestField }) {
  const { control } = useFormContext<SurveyFormValues>();

  return (
    <Controller
      name="interests"
      control={control}
      render={({ field: { value, onChange } }) => {
        const isChecked = value.includes(id);

        const handleChange = (checked: boolean | "indeterminate") => {
          if (checked === true) {
            onChange(Array.from(new Set([...value, id])));
          } else {
            onChange(value.filter((item: InterestField) => item !== id));
          }
        };

        return (
          <Checkbox
            id={id}
            checked={isChecked}
            onCheckedChange={handleChange}
          />
        );
      }}
    />
  );
}
