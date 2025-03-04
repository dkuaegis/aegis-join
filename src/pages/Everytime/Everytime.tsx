import { Button } from "@/components/ui/button";
import AlertBox from "@/components/ui/custom/alertbox";
import NavigationButtons from "@/components/ui/custom/navigationButton";
import { useEverytimeStore } from "@/stores/useEverytimeStore";
import {
  defaultToastId,
  defaultToastOptions,
} from "@/toast/defaultToastOption";
import { LoadingState } from "@/types/state/loading";
import { ClockAlert } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type React from "react";
import { toast } from "react-toastify";
import { fetchPersonalInfoData } from "../PersonalInfo/PersonalInfo.Api";
import { postTimetableData } from "./Everytime.Api";
import HowtoDo from "./Everytime.HowtoDo";
import type { EverytimeValues } from "./Everytime.Schema";
import EverytimeTimeTableLink from "./Everytime.TimeTableLink";
import validateEverytime from "./Everytime.Validate";

interface EverytimeProps {
  onNext: () => void;
  onPrev: () => void;
  onDataSubmit: (data: EverytimeValues) => void;
}

interface TimetableError {
  url?: { message?: string };
}

const TOAST_ID = defaultToastId;

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPersonalInfoData();
        if (
          data.academicStatus === "LEAVE_OF_ABSENCE" ||
          data.academicStatus === "GRADUATED"
        ) {
          setIsValid(true);
          setLoading(LoadingState.SUCCESS);
          toast.success(
            <>
              휴학생 및 졸업생은 다음 버튼을
              <br />
              눌러주세요!
            </>,
            {
              ...defaultToastOptions,
            }
          );
        }
      } catch (error) {
        console.error("Failed to fetch personal info:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = useCallback(
    async (values: EverytimeValues) => {
      try {
        const validationResult = validateEverytime(values);
        if (!validationResult.success) {
          return;
        }

        setLoading(LoadingState.LOADING);

        const success = await postTimetableData(values.url);

        if (!success) {
          throw new Error("시간표 데이터 제출 실패");
        }

        setLoading(LoadingState.SUCCESS);
        setEverytimeData(values);
        onDataSubmit(values);
        setIsValid(true);

        if (!toast.isActive(TOAST_ID)) {
          toast.success("시간표가 제출되었습니다!", {
            ...defaultToastOptions,
          });
        }
      } catch (error) {
        console.error("Error in handleSubmit:", error);
        setLoading(LoadingState.IDLE);

        if (!toast.isActive(TOAST_ID)) {
          toast.error("시간표 제출 실패", {
            ...defaultToastOptions,
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
          "활동을 계획할 때 수업과 겹치지 않게 계획하기 위해서 \n시간표가 필요해요. 이 점 너른 양해 부탁드립니다.",
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
            className="mx-auto mt-6 flex w-full items-center"
            type="submit"
            disabled={loading === LoadingState.LOADING}
          >
            {loading === LoadingState.LOADING
              ? "제출 중..."
              : "시간표 링크 제출하기"}
          </Button>
        </div>
      </form>
      <h4 className="pt-8 font-semibold text-lg">제출 방법</h4>
      <HowtoDo />
      <NavigationButtons
        prev={onPrev}
        next={handleNext}
        isValid={isValid && loading === LoadingState.SUCCESS}
      />
    </div>
  );
}

export default Everytime;
