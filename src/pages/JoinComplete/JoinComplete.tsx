import Confetti from "react-confetti"
import CenterLogo from "./JoinComplete.Centerlogo";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JoinComplete() {
    return (

    <AlignCenter>
        
        <Wrapper>
            <Confetti recycle={false} numberOfPieces={1000} />
            <h1 className="text-4xl font-bold tracking-tight">가입을 축하합니다! 🎉</h1>
            <p className="text-xl text-muted-foreground">성공적으로 가입이 완료되었습니다.</p>
            <CenterLogo />
            <p className="text-lg line-breaks"> 
              앞으로의 모든 활동과 소통은 <strong>디스코드</strong>에서 이루어집니다. Aegis와 함께 성장해 나가요!
            </p>

            <div className="pt-4">
              <p className="text-muted-foreground mb-4">카카오톡 채팅방에서도 공지를 확인할 수 있습니다.</p>
              <Button size="lg" className="w-full text-lg py-6" asChild>
                <a href={import.meta.env.VITE_KAKAO_CHATROOM_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  카카오톡 채팅방 참여하기
                </a>
              </Button>
            </div>
        </Wrapper>
    </AlignCenter>

    );
}

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <div className="space-y-2">{children}</div>;
};

const AlignCenter = ({ children }: { children: React.ReactNode }) => {
    return <div className="flex flex-1 items-center justify-center p-6 text-center">{children}</div>;
};