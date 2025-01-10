import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Everytime() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">에브리타임 시간표 제출</h3>
      <Alert>
        <AlertTitle>시간표 제출 안내</AlertTitle>
        <AlertDescription>
          활동을 계획할 때 수업과 겹치지 않게 계획하기 위해서 시간표가 필요해요.
          시간표 정보는 익명으로 저장돼요.
        </AlertDescription>
      </Alert>
      <div className="space-y-2">
        <Label htmlFor="timetableLink">에브리타임 시간표 링크</Label>
        <Input
          id="timetableLink"
          name="timetableLink"
          placeholder="https://everytime.kr/timetable/..."
          required
        />
      </div>
      <Button type="submit">시간표 제출</Button>
    </div>
  );
}

export default Everytime;
