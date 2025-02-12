import { LoadingState } from "@/types/state/loading";
import { CheckCircleIcon, LoaderCircle } from "lucide-react";

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

export default StatusMessage;
