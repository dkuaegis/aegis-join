import { Button } from "@/components/ui/button";
import { LoadingState } from "@/types/state/loading";
import EverytimeControlledTimeTableLink from "./Everytime.TimeTableLink";
import type { EverytimeValues } from "./Everytime.Schema";
import { CheckCircleIcon, LoaderCircle } from "lucide-react";
import { ClockAlert } from "lucide-react";
import AlertBox from "../../ui/custom/alertbox";
import type React from "react";

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

interface EverytimeItemsProps {
  everytimeValues: EverytimeValues;
  error: {
    timetableLink?: {
      message?: string;
    };
  };
  loading: LoadingState;
  onSubmit: () => Promise<void>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EverytimeItems = ({
  everytimeValues,
  error,
  loading,
  onSubmit,
  onChange,
}: EverytimeItemsProps) => {
  return (
    <div className="space-y-4">
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
          onSubmit();
        }}
      >
        <EverytimeControlledTimeTableLink
          timetableLink={everytimeValues.timetableLink}
          onChange={onChange}
          error={error}
        />
        <div className="mt-4 flex items-center space-x-4">
          <Button className="mt-2 inline" type="submit" disabled={loading === LoadingState.LOADING}>
            {loading === LoadingState.LOADING ? "제출 중..." : "제출"}
          </Button>
          <StatusMessage loading={loading} />
        </div>
      </form>
    </div>
  );
};

export default EverytimeItems;
