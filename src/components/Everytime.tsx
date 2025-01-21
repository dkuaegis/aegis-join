import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircleIcon, ClockAlert, Link, LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

enum LoadingState {
  IDLE = "idle",
  LOADING = "loading",
  SUCCESS = "success",
}

function Everytime({
  onValidate,
  isValid,
}: {
  onValidate: (isValid: boolean) => void;
  isValid: boolean;
}) {
  const [everytimeLink, setEverytimeLink] = useState<string>("");
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);

  // 에브리 타임 시간표도 유효성을 검사해야 한다면, validate 로 검사중.... 띄우기.

  useEffect(() => {
    if (isValid === true) {
      setLoading(LoadingState.SUCCESS);
    }
  }, [isValid]);

  const handleEverytimeValidate = useCallback(async () => {
    if (loading === LoadingState.LOADING) return;
    if (everytimeLink.trim() === "") return;

    console.log(everytimeLink);

    try {
      setLoading(LoadingState.LOADING);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/everytime`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ everytimeLink: everytimeLink }),
        }
      );

      if (!response.ok) {
        onValidate(false);
        throw new Error("error");
      }
      setLoading(LoadingState.SUCCESS);
      onValidate(true);
    } catch (error) {}
  }, [loading, everytimeLink, onValidate]);

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
        <div className="flex items-center justify-center pt-4">
          {loading === LoadingState.IDLE ? null : loading === LoadingState.LOADING ? (
            <>
              <LoaderCircle
                className="h-8 w-8 animate-spin text-gray-500"
                style={{ animation: "spin 3s linear infinite" }}
              />
              <p className="pl-4">시간표 정보를 읽는 중 입니다. . .</p>
            </>
          ) : (
            <>
              <CheckCircleIcon className="h-8 w-8 text-green-400" />
              <p className="pl-4 text-green-400">제출이 완료되었습니다 !</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Everytime;
