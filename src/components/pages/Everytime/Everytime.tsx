import NavigationButtons from "../../ui/custom/navigationButton";
import type { EverytimeValues } from "./Everytime.Schema";
import { LoadingState } from "@/types/state/loading";
import EverytimeTimeTableLink from "./Everytime.TimeTableLink";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, LoaderCircle } from "lucide-react";
import { ClockAlert } from "lucide-react";
import AlertBox from "../../ui/custom/alertbox";
import type React from "react";
import validateEverytime from "./Everytime.Validate";

interface EverytimeProps {
  onNext: () => void;
  onPrev: () => void;
  onDataSubmit: (data: EverytimeValues) => void;
}

interface StatusMessageProps {
  loading: LoadingState;
}

const StatusMessage = ({ loading }: StatusMessageProps) => {
  switch (loading) {
    case LoadingState.LOADING:
      return (
        <>
          <LoaderCircle
            className="h-8 w-8 animate-spin text-gray-500"
            style={{ animation: "spin 3s linear infinite" }}
          />
          <p className="pl-4">시간표 정보를 읽는 중 입니다. . .</p>
        </>
      );

    case LoadingState.SUCCESS:
      return (
        <>
          <CheckCircleIcon className="h-8 w-8 text-green-400" />
          <p className="pl-4 text-green-400">제출이 완료되었습니다 !</p>
        </>
      );

    default:
      return null;
  }
};

function Everytime({ onNext, onPrev, onDataSubmit }: EverytimeProps) {
  // 폼 상태 관리
  const [everytimeValues, setEverytimeValues] = useState<EverytimeValues>({
    timetableLink: "",
    loading: LoadingState.IDLE,
  });

  // 에러 관리
  const [error, setError] = useState<{ timetableLink?: { message?: string } }>({});

  // 로딩 상태 관리
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);

  // 입력 값 변경 시 호출되는 콜백
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEverytimeValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  // 폼 제출 함수 (콜백으로 메모이제이션)
  const handleSubmit = useCallback(async () => {
    // 유효성 검사 함수 호출
    const validationResult = validateEverytime(everytimeValues);

    if (!validationResult.success) {
      // 유효성 검사 실패 시 제출 중단
      setError(validationResult.error || {});
      setLoading(LoadingState.IDLE); // 로딩 상태 초기화
      return;
    }
    setLoading(LoadingState.LOADING); // 로딩 상태 시작
    console.log("제출된 링크:", everytimeValues.timetableLink);

    // 예시: 3초 후에 로딩 상태를 SUCCESS로 변경
    await new Promise((resolve) => setTimeout(resolve, 3000)); // await 추가
    setLoading(LoadingState.SUCCESS); // 로딩 상태 성공으로 변경
    onDataSubmit(everytimeValues); // 데이터 제출
  }, [everytimeValues, onDataSubmit]);

  // onNext 함수 래핑
  const handleNext = () => {
    const validationResult = validateEverytime(everytimeValues);
    if (validationResult.success) {
      setError({}); // 유효성 검사 성공 시 에러 상태 초기화
      onNext();
    } else {
      setError(validationResult.error || {}); // 에러 상태 업데이트
    }
  };

  useEffect(() => {
    const validationResult = validateEverytime(everytimeValues);
    if (validationResult.success) {
      setError({}); // 유효성 검사 성공 시 에러 상태 초기화
    }
  }, [everytimeValues]);

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
      <form
        className="my-10 space-y-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(); // onSubmit 함수 호출
        }}
      >
        <EverytimeTimeTableLink
          timetableLink={everytimeValues.timetableLink}
          onChange={handleChange} // onChange 함수 전달
          error={error}
        />
        <div className="mt-4 flex items-center space-x-4">
          <Button className="mt-2 inline" type="submit" disabled={loading === LoadingState.LOADING}>
            {loading === LoadingState.LOADING ? "제출 중..." : "제출"}
          </Button>
          <StatusMessage loading={loading} />
        </div>
      </form>
      <NavigationButtons
        prev={onPrev}
        next={handleNext} // handleNext 함수 전달
        isValid={Object.keys(error).length === 0 && loading === LoadingState.SUCCESS}
      />
    </div>
  );
}

export default Everytime;
