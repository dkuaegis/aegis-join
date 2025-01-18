import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClockAlert, Link } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

function Everytime({
  onValidate,
}: {
  onValidate: (isValid: boolean) => void;
}) {
  const [everytimeLink, setEverytimeLink] = useState<string>("");
  
  // 에브리 타임 시간표도 유효성을 검사해야 한다면, validate 로 검사중.... 띄우기.
  
  useEffect(() => {
    onValidate(false);
  }, [])

  const handleEverytimeValidate = useCallback(() => {
    console.log(everytimeLink);
    if (everytimeLink.trim() !== "") {
      onValidate(true);
    } else {
      onValidate(false);
    }

  }, [everytimeLink, onValidate]);


  return (
    <div className="mb-12 space-y-4">
      <h3 className="font-semibold text-lg">에브리타임 시간표 제출</h3>
      <Alert>
        <ClockAlert className="h-4 w-4" />

        <AlertTitle>시간표 제출이 왜 필요한가요?</AlertTitle>
        <AlertDescription>
          활동을 계획할 때 수업과 겹치지 않게 계획하기 위해서 시간표가 필요해요.
        </AlertDescription>
      </Alert>
      <div className="my-10 space-y-2">
        <Label htmlFor="timetableLink">에브리타임 시간표 링크</Label>
        <div className="items-right flex space-x-4">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Link className="h-4 w-4 text-gray-500" />
            </div>
            <Input
              id="timetableLink"
              type="timetableLink"
              name="timetableLink"
              placeholder="https://everytime.kr/timetable/..."
              className="pl-10"
              onChange={(e) => setEverytimeLink(e.target.value)}
              required
            />
          </div>
          <Button 
            className="inline" 
            type="submit"
            onClick={handleEverytimeValidate}
            >
            제출
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Everytime;
