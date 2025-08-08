import { lazy, Suspense } from "react";
import Rocket from "@/assets/lottie/Rocket.json";
import DiscordNotice from "./JoinComplete.DiscordNotice";
import KakaoChatroom from "./JoinComplete.KakaoChatroom";

const Lottie = lazy(() => import("lottie-react"));

const JoinComplete = () => {
  return (
    <Wrapper>
      <Suspense fallback={<div style={{ width: 300, height: 300 }} />}>
        <Lottie
          animationData={Rocket}
          loop={true}
          style={{ width: 300, height: 300 }}
        />
      </Suspense>
      <p className="font-bold text-3xl mt-4 mb-16">
        등록이 완료됐어요
      </p>
      <DiscordNotice />
      <KakaoChatroom />
    </Wrapper>
  );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto mb-8 w-full max-w-md px-4 py-8 pb-28 text-center space-y-4 mt-16">{children}</div>; 
};


export default JoinComplete;
