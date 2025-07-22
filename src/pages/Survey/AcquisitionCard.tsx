import ToggleCardWrapper from "@/components/ui/custom/toggle-card-wrapper";

interface AcquisitionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  icon: string;
  isSelected: boolean;
}

export const AcquisitionCard = ({
  label,
  icon,
  isSelected,
  className,
  ...props
}: AcquisitionCardProps) => {
  return (
    <ToggleCardWrapper
      isSelected={isSelected}
      className={className}
      {...props}
    >
      <img src={icon} alt={label} className="mb-2 h-10 w-10" />
      <span className="font-semibold text-sm">{label}</span>
    </ToggleCardWrapper>
  );
};
