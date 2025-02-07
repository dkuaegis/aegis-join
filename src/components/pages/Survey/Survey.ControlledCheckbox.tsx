import { InterestField } from "@/types/api/survey";
import { Controller, useFormContext } from "react-hook-form";
import { SurveyFormValues } from "./Survey.schema";
import { Checkbox } from "@/components/ui/checkbox";



export function ControlledCheckbox({ id }: { id: InterestField } ) {
    const { control } = useFormContext<SurveyFormValues>();
  
    return (
      <Controller
        name="interestFields"
        control={control}
        render={({ field: { value, onChange } }) => {

          const isChecked = value.includes(id);

          const handleChange = (checked: boolean) => {
            if (checked) {
              onChange([...value, id]);
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