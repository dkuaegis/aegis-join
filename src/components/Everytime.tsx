import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link , ClockAlert} from 'lucide-react'

function Everytime() {
  return (
    <div className="space-y-4 mb-12">
      <h3 className="font-semibold text-lg">에브리타임 시간표 제출</h3>
      <Alert>
        <ClockAlert className="h-4 w-4"/>
        
        <AlertTitle>시간표 제출이 왜 필요한가요?</AlertTitle>
        <AlertDescription>
          활동을 계획할 때 수업과 겹치지 않게 계획하기 위해서 시간표가 필요해요.
        </AlertDescription>
      </Alert>
      <div className="space-y-2 my-10">
        <Label htmlFor="timetableLink">에브리타임 시간표 링크</Label>
        <div className="flex items-right space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Link className="h-4 w-4 text-gray-500" />
            </div>
            <Input
              id="timetableLink"
              type="timetableLink"
              name="timetableLink"
              placeholder="https://everytime.kr/timetable/..."
              className="pl-10"
              required
            />
          </div>
          <Button className="inline" type="submit">제출</Button>
        </div>
      </div>
    </div>
  );
}

export default Everytime;
