import { lazy, Suspense } from "react";
import Rocket from "@/assets/lottie/Rocket.json";
import DiscordNotice from "./JoinComplete.DiscordNotice";
import KakaoChatroom from "./JoinComplete.KakaoChatroom";

const Lottie = lazy(() => import("lottie-react"));

const JoinComplete = () => {
  return (
    <Wrapper>
      <Suspense fallback={<div className="mx-auto" style={{ width: 240, height: 240 }} />}>
        {/* Lottie 애니메이션 크기를 줄여 세로 공간을 확보합니다. */}
        <Lottie
          animationData={Rocket}
          loop={true}
          style={{ width: 240, height: 240, margin: "0 auto" }}
        />
      </Suspense>
      <p className="mt-4 font-bold text-3xl">등록이 완료됐어요</p>
      <DiscordNotice />
      <KakaoChatroom />
    </Wrapper>
  );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto mt-16 mb-8 w-full max-w-md space-y-4 px-4 py-8 pb-28 text-center">
      {children}
    </div>
  );
};

export default JoinComplete;
