// Everytime.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingState } from "@/types/state/loading";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircleIcon, ClockAlert, Link, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import AlertBox from "../ui/custom/alertbox";
import NavigationButtons from "../ui/custom/navigationButton";

// zod 스키마 정의
const schema = z.object({
  timetableLink: z.string().url({ message: "올바른 URL 형식이 아닙니다." }),
});

// zod 스키마 타입 정의
type EverytimeValues = z.infer<typeof schema>;

function Everytime({
  onNext,
  onPrev,
}: {
  onNext: (data: EverytimeValues) => void;
  onPrev: () => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EverytimeValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);

  const onSubmit = async (data: EverytimeValues) => {
    setLoading(LoadingState.LOADING);
    // TODO: 시간표 링크 제출 로직 구현
    console.log("제출된 링크:", data.timetableLink);
    // 예시: 3초 후에 로딩 상태를 SUCCESS로 변경
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setLoading(LoadingState.SUCCESS);
    onNext(data); // 다음 단계로 이동
  };

  return (
    <div className="mb-12 space-y-4">
      <h3 className="font-semibold text-lg">에브리타임 시간표 제출</h3>
      <AlertBox
        icon={<ClockAlert className="h-4 w-4" />}
        title="시간표 제출이 왜 필요한가요?"
        description={[
          "활동을 계획할 때 수업과 겹치지 않게 계획하기 위해서 시간표가 필요해요.",
        ]}
      />
      <form className="my-10 space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="timetableLink">에브리타임 시간표 링크</Label>
        <div className="items-right flex space-x-4">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Link className="h-4 w-4 text-gray-500" />
            </div>
            <Controller
              name="timetableLink"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  id="timetableLink"
                  type="url"
                  placeholder="https://everytime.kr/timetable/..."
                  className="pl-10"
                  {...field}
                />
              )}
            />
            {errors.timetableLink && (
              <p className="text-red-500 text-xs">
                {errors.timetableLink.message}
              </p>
            )}
          </div>
          <Button
            className="inline"
            type="submit"
            disabled={loading === LoadingState.LOADING}
          >
            {loading === LoadingState.LOADING ? "제출 중..." : "제출"}
          </Button>
        </div>
        <div className="flex items-center justify-center pt-4">
          <StatusMessage loading={loading} /> {/* StatusMessage 컴포넌트로 빼기 */}
        </div>
        <NavigationButtons
          prev={onPrev}
          next={() => handleSubmit(onSubmit)()}
          isValid={true}
        />
      </form>
    </div>
  );
}

export default Everytime;
