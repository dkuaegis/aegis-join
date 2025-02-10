import { Button } from "@/components/ui/button";
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
  const [formValues, setFormValues] = useState<EverytimeValues>({
    timetableLink: "",
    loading: LoadingState.IDLE,
  });
  const [error, setError] = useState<{ timetableLink?: { message?: string } }>(
    {}
  );
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasInput, setHasInput] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    resetFlags();
  }, []);

  const handleSubmit = useCallback(async () => {
    const validationResult = validateEverytime(formValues);

    if (!validationResult.success) {
      setError(validationResult.error || {});
      setLoading(LoadingState.IDLE);
      resetFlags();
      return;
    }

    setLoading(LoadingState.LOADING);
    console.log("제출된 링크:", formValues.timetableLink);

    await new Promise((resolve) => setTimeout(resolve, 3000)); // 3초 후 성공

    setLoading(LoadingState.SUCCESS);
    onDataSubmit(formValues);
    setIsSubmitted(true);
    setIsValid(true);
  }, [formValues, onDataSubmit]);

  // useCallback: Reset Flags
  const resetFlags = useCallback(() => {
    setIsSubmitted(false);
    setIsValid(false);
    setHasInput(true);
  }, []);

  // useCallback: Next Button Handler
  const handleNext = useCallback(() => {
    if (isValid && isSubmitted) {
      setError({});
      onNext();
    } else {
      setError(validateEverytime(formValues).error || {});
    }
  }, [isValid, isSubmitted, onNext, formValues]);

  useEffect(() => {
    if (hasInput) {
      const validationResult = validateEverytime(formValues);
      if (validationResult.success) {
        setError({});
      } else {
        setError(validationResult.error || {});
      }
    } else {
      setError({});
    }
  }, [formValues, hasInput]);

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
        prev={onPrev}
        next={handleNext}
        isValid={navigationButtonsValid}
      />
    </div>
  );
}

export default Everytime;
