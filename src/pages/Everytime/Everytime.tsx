import { Button } from "@/components/ui/button";
import AlertBox from "@/components/ui/custom/alertbox";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import { useEverytimeStore } from "@/stores/useEverytimeStore";
import { LoadingState } from "@/types/state/loading";
import { ClockAlert } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type React from "react";
import { type ToastOptions, cssTransition, toast } from "react-toastify";
import { postTimetableData } from "./Everytime.Api";
import type { EverytimeValues } from "./Everytime.Schema";
import EverytimeTimeTableLink from "./Everytime.TimeTableLink";
import validateEverytime from "./Everytime.Validate";

const fadeInOut = cssTransition({
  enter: "fade-in",
  exit: "fade-out",
});

interface EverytimeProps {
  onNext: () => void;
  onPrev: () => void;
  onDataSubmit: (data: EverytimeValues) => void;
}

interface TimetableError {
  url?: { message?: string };
}

const defaultToastOptions: ToastOptions = {
  transition: fadeInOut,
  position: "bottom-center",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  theme: "colored",
  style: {
    marginBottom: "50%",
    width: "84%",
    fontFamily: "sans-serif",
    textAlign: "center",
  },
  className: "rounded-lg shadow-lg p-4",
};

function Everytime({ onNext, onPrev, onDataSubmit }: EverytimeProps) {
  const { everytimeData, setEverytimeData } = useEverytimeStore();

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
        setIsValid(true);

        const toastId = "timetable-toast";
        if (!toast.isActive(toastId)) {
          toast.success("시간표가 제출되었습니다!", {
            ...defaultToastOptions,
            toastId,
          });
        }
      } catch (error) {
        console.error("Error in handleSubmit:", error);
        setLoading(LoadingState.IDLE);

        const toastId = "timetable-toast-error";
        if (!toast.isActive(toastId)) {
          toast.error("시간표 제출 실패", {
            ...defaultToastOptions,
            toastId,
            autoClose: 1000,
          });
        }
      }
    },
    [onDataSubmit, setEverytimeData]
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
            className="mx-auto mt-6 flex w-11/12 items-center"
            type="submit"
            disabled={loading === LoadingState.LOADING}
          >
            {loading === LoadingState.LOADING
              ? "제출 중..."
              : "시간표 링크 제출하기"}
          </Button>
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
