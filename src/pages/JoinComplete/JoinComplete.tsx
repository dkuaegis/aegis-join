// import Confetti from "react-confetti";
import CenterLogo from "./JoinComplete.Centerlogo";
import DiscordNotice from "./JoinComplete.DiscordNotice";
import KakaoChatroom from "./JoinComplete.KakaoChatroom";

export default function JoinComplete() {
  return (
    <AlignCenter>
      <Wrapper>
        {/* <Confetti recycle={false} numberOfPieces={500} /> */}
        <h2 className="font-bold text-3xl tracking-tight">
          가입을 축하합니다! 🎉
        </h2>
        <p className="text-muted-foreground text-xl">
          성공적으로 가입이 완료되었습니다.
        </p>
        <CenterLogo />
        <DiscordNotice />
        <KakaoChatroom />
      </Wrapper>
    </AlignCenter>
  );
}

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
