import { cn } from "@/lib/utils";

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
    <div
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-transparent bg-white p-4 shadow-md transition-all duration-300 ease-in-out",
        !isSelected && "hover:shadow-lg hover:-translate-y-1",
        isSelected && "scale-105 border-primary bg-primary/10 shadow-lg",
        className
      )}
      {...props}
    >
      <img src={icon} alt={label} className="mb-2 h-10 w-10" />
      <span className="text-sm font-semibold">{label}</span>
    </div>
  );
};