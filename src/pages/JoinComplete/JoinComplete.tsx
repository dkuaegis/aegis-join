import Lottie from "lottie-react";
import Rocket from "@/assets/lottie/Rocket.json";
import DiscordNotice from "./JoinComplete.DiscordNotice";
import KakaoChatroom from "./JoinComplete.KakaoChatroom";

const JoinComplete = () => {
  return (
    <AlignCenter>
      <Wrapper>
        <Lottie
          animationData={Rocket}
          loop={true}
          style={{ width: 300, height: 300 }}
        />
        <p className="text-muted-foreground text-xl">
          성공적으로 가입이 완료되었습니다.
        </p>
        <DiscordNotice />
        <KakaoChatroom />
      </Wrapper>
    </AlignCenter>
  );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-4">{children}</div>;
};

const AlignCenter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 items-center justify-center p-6 text-center">
      {children}
    </div>
  );
};

export default JoinComplete;
