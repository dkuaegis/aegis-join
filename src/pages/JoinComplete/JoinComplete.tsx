import { Button } from "@/components/ui/button";
// import { MessageCircle } from "lucide-react";
import Confetti from "react-confetti";
import CenterLogo from "./JoinComplete.Centerlogo";
import DiscordIcon from "@/assets/discordIcon.svg";

export default function JoinComplete() {
  return (
    <AlignCenter>
      <Wrapper>
        <Confetti recycle={false} numberOfPieces={500} />
        <h2 className="font-bold text-3xl tracking-tight">
          가입을 축하합니다! 🎉
        </h2>
        <p className="text-muted-foreground text-xl">
          성공적으로 가입이 완료되었습니다.
        </p>
        <CenterLogo />
        <p className="line-breaks text-lg">
          앞으로의 모든 활동과 소통은 <strong>디스코드</strong>에서
          이루어집니다. Aegis와 함께 성장해 나가요!
        </p>

        <div className="line-breaks pt-8">
          <Button
            size="lg"
            className="w-full bg-discord-blue py-6 text-lg text-white hover:bg-blue-800"
            asChild
          >
            <a
              href={import.meta.env.VITE_DISCORD_NOTICE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={DiscordIcon} alt="Discord Icon" className="mr-2 h-5 w-5" />
              디스코드 공지방 확인하기
            </a>
          </Button>
        </div>

        {/* <div className="line-breaks pt-8">
          <p className="mb-1 text-muted-foreground">
            오픈채팅방에서도 공지를 확인할 수 있습니다.
          </p>
          <Button
            size="lg"
            className="w-full bg-yellow-400 py-6 text-black text-lg hover:bg-yellow-600"
            asChild
          >
            <a
              href={import.meta.env.VITE_KAKAO_CHATROOM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              카카오톡 채팅방 참여하기
            </a>
          </Button>
        </div> */}
      </Wrapper>
    </AlignCenter>
  );
}

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-2">{children}</div>;
};

const AlignCenter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 items-center justify-center p-6 text-center">
      {children}
    </div>
  );
};
