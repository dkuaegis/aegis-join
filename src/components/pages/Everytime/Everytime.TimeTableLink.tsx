import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "lucide-react";
import type React from "react";

interface ControlledTimeTableLinkProps {
  timetableLink: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: {
    timetableLink?: {
      message?: string;
    };
  };
}

const EverytimeControlledTimeTableLink = ({
  timetableLink,
  onChange,
  error,
}: ControlledTimeTableLinkProps) => {
  return (
    <>
      <Label htmlFor="timetableLink">에브리타임 시간표 링크</Label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Link className="h-4 w-4 text-gray-500" />
        </div>
        <Input
          id="timetableLink"
          name="timetableLink"
          type="url"
          placeholder="https://everytime.kr/@..."
          className="pl-10"
          value={timetableLink}
          onChange={onChange}
        />
        {error.timetableLink && (
          <p className="absolute top-full left-0 text-red-500 text-xs">
            {error.timetableLink.message}
          </p>
        )}
      </div>
    </>
  );
};

export default EverytimeControlledTimeTableLink;
