import { Button } from "@/components/ui/button";
import { useEverytimeStore } from "@/stores/useEverytimeStore";
import { LoadingState } from "@/types/state/loading";
import { CheckCircleIcon, LoaderCircle } from "lucide-react";
import { ClockAlert } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type React from "react";
import AlertBox from "@/components/ui/custom/alertbox";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import { fetchTimetableData, postTimetableData } from "./Everytime.Api";
import type { EverytimeValues } from "./Everytime.Schema";
import EverytimeTimeTableLink from "./Everytime.TimeTableLink";
import validateEverytime from "./Everytime.Validate";

interface EverytimeProps {
  onNext: () => void;
  onPrev: () => void;
  onDataSubmit: (data: EverytimeValues) => void;
}

const StatusMessage = ({ loading }: { loading: LoadingState }) => {
  switch (loading) {
    case LoadingState.LOADING:
      return (
        <>
          <LoaderCircle className="h-8 w-8 animate-spin text-gray-500" />
          <p className="pl-4">시간표 정보를 읽고 있습니다...</p>
        </>
      );
    case LoadingState.SUCCESS:
      return (
        <>
          <CheckCircleIcon className="h-8 w-8 text-green-400" />
          <p className="pl-4 text-green-400">제출이 완료되었습니다!</p>
        </>
      );
    default:
      return null;
  }
};

interface TimetableError {
  url?: { message?: string };
}

function Everytime({ onNext, onPrev, onDataSubmit }: EverytimeProps) {
  const { everytimeData, setEverytimeData, isInitial, setNotInitial } =
    useEverytimeStore();

  const [formValues, setFormValues] = useState<EverytimeValues>({
    url: everytimeData?.url || "",
    loading: everytimeData?.loading || LoadingState.IDLE,
  });

  const [error, setError] = useState<TimetableError>({});
  const [loading, setLoading] = useState<LoadingState>(LoadingState.IDLE);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isTouched, setIsTouched] = useState(false);

  const formValuesRef = useRef(formValues);

  useEffect(() => {
    formValuesRef.current = formValues;
  }, [formValues]);

  useEffect(() => {
    if (isInitial) {
      const loadData = async () => {
        const data = await fetchTimetableData();
        if (data?.url) {
          setFormValues((prev) => ({ ...prev, url: data.url }));
        }
      };
      loadData();
      setNotInitial();
    }
  }, [isInitial, setNotInitial]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsTouched(true);
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  useEffect(() => {
    if (!isTouched) return;
    const validationResult = validateEverytime(formValues);
    if (validationResult.success) {
      setError({});
    } else {
      setError(validationResult.error || {});
    }
    setIsValid(validationResult.success);
  }, [formValues, isTouched]);

  const handleSubmit = useCallback(
    async (values: EverytimeValues) => {
      try {
        const validationResult = validateEverytime(values);
        if (!validationResult.success) {
          setError(validationResult.error || {});
          setLoading(LoadingState.IDLE);
          return;
        }

        setLoading(LoadingState.LOADING);
        console.log("제출된 링크:", values.url);

        const success = await postTimetableData(values.url);

        if (!success) {
          throw new Error("시간표 데이터 제출 실패");
        }

        setLoading(LoadingState.SUCCESS);
        setEverytimeData(values);
        onDataSubmit(values);
        setNotInitial();
        setIsValid(true);
      } catch (error) {
        console.error("Error in handleSubmit:", error);
        setLoading(LoadingState.IDLE);
        if (error instanceof Error) {
          setError({
            url: {
              message: error.message || "시간표 제출 중 오류가 발생했습니다.",
            },
          });
        } else {
          setError({ url: { message: "알 수 없는 오류가 발생했습니다." } });
        }
      }
    },
    [onDataSubmit, setNotInitial, setEverytimeData]
  );

  const handleNext = useCallback(() => {
    if (!isValid || loading !== LoadingState.SUCCESS) return;
    setEverytimeData(formValuesRef.current);
    onNext();
  }, [onNext, isValid, loading, setEverytimeData]);

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
          handleSubmit(formValues);
        }}
      >
        <EverytimeTimeTableLink
          url={formValues.url}
          onChange={handleChange}
          error={error}
        />
        <div className="mt-4 flex items-center space-x-4">
          <Button
            className="mt-2 inline"
            type="submit"
            disabled={loading === LoadingState.LOADING}
          >
            {loading === LoadingState.LOADING ? "제출 중..." : "제출"}
          </Button>
          <StatusMessage loading={loading} />
        </div>
      </form>
      <NavigationButtons
        prev={onPrev}
        next={handleNext}
        isValid={isValid && loading === LoadingState.SUCCESS}
      />
    </div>
  );
}

export default Everytime;
