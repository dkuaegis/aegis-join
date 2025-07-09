import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "lucide-react";
import type React from "react";

interface TimeTableLinkProps {
  url: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: {
    url?: {
      message?: string;
    };
  };
}

const EverytimeTimeTableLink = ({
  url,
  onChange,
  error,
}: TimeTableLinkProps) => {
  return (
    <>
      <Label htmlFor="url">에브리타임 시간표 링크</Label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Link className="h-4 w-4 text-gray-500" />
        </div>
        <Input
          id="url"
          name="url"
          type="url"
          placeholder="https://everytime.kr/@..."
          className="pl-10"
          value={url}
          onChange={onChange}
        />
        {error.url && (
          <p className="absolute top-full left-0 text-red-500 text-sm">
            {error.url.message}
          </p>
        )}
      </div>
    </>
  );
};

export default EverytimeTimeTableLink;
