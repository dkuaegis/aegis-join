import { Button } from "@/components/ui/button";
import { useEverytimeStore } from "@/stores/useEverytimeStore";
import { LoadingState } from "@/types/state/loading";
import { CheckCircleIcon, LoaderCircle } from "lucide-react";
import { ClockAlert } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type React from "react";
import AlertBox from "../../ui/custom/alertbox";
import NavigationButtons from "../../ui/custom/navigationButton";
import type { EverytimeValues } from "./Everytime.Schema";
import EverytimeTimeTableLink from "./Everytime.TimeTableLink";
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
          <p className="pl-4">시간표 정보를 읽고 있습니다...</p>
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
  const { everytimeData, setEverytimeData, isInitial, setNotInitial } =
    useEverytimeStore();

  const [formValues, setFormValues] = useState<EverytimeValues>({
    timetableLink: everytimeData?.timetableLink || "",
    loading: everytimeData?.loading || LoadingState.IDLE,
  });

  const [error, setError] = useState<{ timetableLink?: { message?: string } }>(
    {}
  );
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);
  const [isValid, setIsValid] = useState<boolean>(false); // isValid 상태 분리

  useEffect(() => {
    if (isInitial && everytimeData) {
      setFormValues({
        timetableLink: everytimeData.timetableLink || "",
        loading: everytimeData.loading || LoadingState.IDLE,
      });
      setNotInitial();
      // 이미 제출된 데이터가 있다면, isValid를 true로 설정
      if (everytimeData.loading === LoadingState.SUCCESS) {
        setIsValid(true);
      }
    }
  }, [isInitial, everytimeData, setNotInitial]);

  useEffect(() => {
    return () => {
      if (formValues) {
        setEverytimeData(formValues);
      }
    };
  }, [formValues, setEverytimeData]);

  // 입력 값 변경 시 유효성 검사
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormValues((prev) => ({ ...prev, [name]: value }));

      // 유효성 검사
      const validationResult = validateEverytime({
        ...formValues,
        [name]: value,
      });
      if (validationResult.success) {
        setError({}); // 유효하면 에러 초기화
      } else {
        setError(validationResult.error || {}); // 유효하지 않으면 에러 업데이트
      }
      setIsValid(false); // 입력 변경 시 isValid를 false로 설정
    },
    [formValues]
  );

  const handleSubmit = useCallback(async () => {
    const validationResult = validateEverytime(formValues);

    if (!validationResult.success) {
      setError(validationResult.error || {});
      setLoading(LoadingState.IDLE);
      return;
    }

    setLoading(LoadingState.LOADING);
    console.log("제출된 링크:", formValues.timetableLink);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    setLoading(LoadingState.SUCCESS);
    setEverytimeData(formValues);
    onDataSubmit(formValues);
    setNotInitial();
    setIsValid(true); // 제출 성공 시  isValid를 true로 설정
  }, [formValues, onDataSubmit, setNotInitial, setEverytimeData]);

  const handleNext = useCallback(() => {
    if (isValid) {
      setEverytimeData(formValues);
      onNext();
    } else {
      const validationResult = validateEverytime(formValues);
      if (!validationResult.success) {
        setError(validationResult.error || {});
      }
    }
  }, [onNext, formValues, setEverytimeData, isValid]);

  const isSubmitButtonDisabled = loading === LoadingState.LOADING;
  const navigationButtonsValid = isValid && loading !== LoadingState.LOADING;

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
          handleSubmit();
        }}
      >
        <EverytimeTimeTableLink
          timetableLink={formValues.timetableLink}
          onChange={handleChange}
          error={error}
        />
        <div className="mt-4 flex items-center space-x-4">
          <Button
            className="mt-2 inline"
            type="submit"
            disabled={isSubmitButtonDisabled}
          >
            {loading === LoadingState.LOADING ? "제출 중..." : "제출"}
          </Button>
          <StatusMessage loading={loading} />
        </div>
      </form>
      <NavigationButtons
        prev={() => {
          setEverytimeData(formValues);
          onPrev();
        }}
        next={handleNext}
        isValid={navigationButtonsValid}
      />
    </div>
  );
}

export default Everytime;
